import { Dispatch, createRef } from 'react';
import { requestVerifyJwt, receiveValidJwt, receiveInvalidJwt, showPresentationRequest } from './scanned-presentation/actions';
import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver'
import { verifyPresentation, VerifiedPresentation as W3CVerifiedPresentation } from 'did-jwt-vc'
import { mapFromPayload, VerifiedPresentation } from '../api';
import { ISSUER_DID, RPC_URL, DID_REGISTRY_ADDRESS } from '@env'
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
      throw new Error('Invalid QR code')
    }

    let vpJwt: string;

    axios.post(url, { pwd })
      .then((res: any) => res.status === 200 && res.data)
      .then((data: any) => data.jwt)
      .then((jwt: string) => keccak256(jwt).toString('hex') !== vpHash ? (() => { throw new Error('Corrupted presentation') })() : jwt)
      .then((jwt: string) => {
        vpJwt = jwt;
        return verifyPresentation(jwt, resolver)
      })
      .then((vp: W3CVerifiedPresentation) => {
        const verified = mapFromPayload(vp.verifiablePresentation.verifiableCredential[0], data)

        presentation = validateVerifiedPresentation(verified, baseFailedPresentation);

        dispatch(receiveValidJwt(presentation))
      })
      .catch((err: Error) => {
        // the jwt is well formatted, so try to decode it and get the subject fullName anyway
        try {
          const decoded = decodeJWT(data)

          if (decoded?.payload?.vp?.verifiableCredential[0]) {
            const credential = decodeJWT(decoded.payload.vp.verifiableCredential[0])

            presentation = {
              ...baseFailedPresentation,
              failureReason: err.message,
              fullName: credential.payload.vc.credentialSubject['fullName'],
              credentialDetails: credential.payload.vc,
              vpJwt, 
            }
          }
        } catch {
          presentation = {
            ...baseFailedPresentation,
            failureReason: err.message,
          }
        }

        dispatch(receiveInvalidJwt(presentation))
      })
      .finally(dispatchAndAddToStorage)
  } catch (err) {
    presentation = {
      ...baseFailedPresentation,
      failureReason: err.message,
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
  if (!presentation.credentialDetails) {
    return {
      ...baseFailedPresentation,
      failureReason: 'Invalid credential details'
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
