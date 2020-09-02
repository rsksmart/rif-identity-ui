import { Dispatch } from 'react';
import { requestVerifyJwt, receiveValidJwt, receiveInvalidJwt, showPresentationRequest } from './scanned-presentation/actions';
import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver'
import { verifyPresentation, VerifiedPresentation as W3CVerifiedPresentation } from 'did-jwt-vc'
import { mapFromPayload, VerifiedPresentation } from '../api';
import { ISSUER_DID, RPC_URL, DID_REGISTRY_ADDRESS, DEFAULT_VP_EXPIRATION_SECONDS } from '@env'
import { StorageProvider, STORAGE_KEYS } from '../providers';
import { addScannedPresentation, cleanScannedPresentations } from './scanned-presentations-list/actions';
import { decodeJWT } from 'did-jwt'
import axios from 'axios'
import { keccak256 } from 'js-sha3';
import { requestScanAgain, receiveQrScan } from '../state/localUi/actions';
import { navigate } from '../AppNavigation';

const providerConfig = {
  networks: [
    { name: "rsk:testnet", rpcUrl: RPC_URL, registry: DID_REGISTRY_ADDRESS }
  ]
}
const resolver = new Resolver(getResolver(providerConfig));

export const scanQR = (data: string, scannedPresentations: VerifiedPresentation[], navigation: any) => async (dispatch: Dispatch) => {
  const baseFailedPresentation = {
    dateVerified: new Date(),
    success: false,
    qrData: data,
  }

  const dispatchAndAddToStorage = () => {
    dispatch(addScannedPresentation(presentation))
      
    const scanned = [...scannedPresentations, presentation]
    StorageProvider.set(STORAGE_KEYS.SCANNED_CREDENTIALS, JSON.stringify(scanned)).then(() => {
      navigation.navigate('PresentationNavigation', { screen: 'Details' });
    })
  }
  
  dispatch(receiveQrScan())
  dispatch(requestVerifyJwt())

  let presentation: VerifiedPresentation

  try {
    const { pwd, url, vpHash } = JSON.parse(data)

    if (!pwd || !url || !vpHash) {
      throw new Error('invalid_qr')
    }

    let vpJwt: string;

    axios.post(url, { pwd })
      .then((res: any) => res.status === 200 && res.data)
      .then((data: any) => data.jwt)
      .then((jwt: string) => keccak256(jwt).toString('hex') !== vpHash ? (() => { throw new Error('corrupted_presentation') })() : jwt)
      .then((jwt: string) => {
        vpJwt = jwt;
        return verifyPresentation(jwt, resolver)
      })
      .then((vp: W3CVerifiedPresentation) => {
        const verified = mapFromPayload(vp, data)

        presentation = validateVerifiedPresentation(verified, baseFailedPresentation);

        dispatch(receiveValidJwt(presentation))
      })
      .catch((err: Error) => {
        // if the jwt is well formatted, so try to decode it and get the subject details anyway
        
        let failureReason = err.message
        let credentialDetails = { }
        
        try {
          if (vpJwt) {
            const decoded = decodeJWT(vpJwt)

            failureReason = getFailureReason(err.message)

            if (decoded?.payload?.vp?.verifiableCredential[0]) {
              const credential = decodeJWT(decoded.payload.vp.verifiableCredential[0])

              credentialDetails = {
                type: credential.payload.vc.credentialSubject['type'],
                fullName: credential.payload.vc.credentialSubject['fullName'],
                credentialDetails: credential.payload.vc,
                vpJwt, 
              }
            }
          }
        } finally {
          presentation = {
            ...baseFailedPresentation,
            failureReason,
            ...credentialDetails,
          }
        }

        dispatch(receiveInvalidJwt(presentation))
      })
      .finally(dispatchAndAddToStorage)
  } catch (err) {
    const failureReason = getFailureReason(err.message)

    presentation = {
      ...baseFailedPresentation,
      failureReason,
    }

    dispatch(receiveInvalidJwt(presentation))

    dispatchAndAddToStorage()
  }
}

export const cleanStorage = () => async (dispatch: Dispatch) => {
  dispatch(cleanScannedPresentations())
  
  StorageProvider.remove(STORAGE_KEYS.SCANNED_CREDENTIALS)
}

export const showPresentation = (presentation: VerifiedPresentation, navigation: any) => async (dispatch: Dispatch) => {
  dispatch(showPresentationRequest(presentation))
      
  navigation.navigate('PresentationNavigation', { screen: 'Details' });
}

export const goToScanner = () =>  async (dispatch: Dispatch) => {
  dispatch(requestScanAgain())

  navigate('ScanQR', { screen: 'Details' });
}

const validateVerifiedPresentation = (presentation: VerifiedPresentation, baseFailedPresentation: VerifiedPresentation): VerifiedPresentation => {
  const { credentialDetails } = presentation;
  
  if (!credentialDetails) {
    return {
      ...baseFailedPresentation,
      failureReason: 'invalid_credential_details'
    };
  }

  if (!credentialDetails.expirationDate) {
    return {
      ...presentation,
      success: false,
      failureReason: 'no_vc_expiration'
    };
  } else if (credentialDetails.expirationDate.getTime() <= Date.now()) {
    return {
      ...presentation,
      success: false,
      failureReason: 'expired_credential'
    };
  }

  if (
      !presentation.issuer || 
      presentation.issuer.toLowerCase() !== credentialDetails.subject.toLowerCase()
    ) {
    return {
      ...presentation,
      success: false,
      failureReason: 'invalid_vp_issuer'
    };
  }

  if (!presentation.issuanceDate) {
    return {
      ...presentation,
      success: false,
      failureReason: 'no_issuance_date'
    };
  }

  if (
    !presentation.expirationDate && 
    presentation.issuanceDate.getTime() + DEFAULT_VP_EXPIRATION_SECONDS * 1000 <= Date.now()
  ) {
    return {
      ...presentation,
      success: false,
      failureReason: 'expired_presentation'
    };
  }

  // const ALLOWED_DIDS: string[] = ISSUER_DID.split(',')
  
  // if (ISSUER_DID && !ALLOWED_DIDS.some(
  //   did => did.toLowerCase() === presentation.credentialDetails!.issuer.toLowerCase()
  // )) {
  //   return {
  //     ...baseFailedPresentation,
  //     fullName: presentation.credentialDetails.credentialSubject['fullName'],
  //     failureReason: 'Invalid issuer',
  //   };
  // }

  return presentation
}

const getFailureReason = (error: string): string => {
  if (error.toLowerCase().includes('jwt has expired')) {
    return 'expired_presentation'
  }

  if (error.toLowerCase().includes('json parse error')) {
    return 'invalid_qr'
  }

  return error
}