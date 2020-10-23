import { Dispatch } from 'react';
import { requestVerifyJwt, receiveValidJwt, receiveInvalidJwt, showPresentationRequest } from './scanned-presentation/actions';
import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver'
import { verifyPresentation, VerifiedPresentation as W3CVerifiedPresentation } from 'did-jwt-vc'
import { mapFromPayload, VerifiedPresentation } from '../api';
import {
  RPC_URL, DID_REGISTRY_ADDRESS, DEFAULT_VP_EXPIRATION_SECONDS,
  CONVEY_URL, IPFS_GATEWAY,
} from '../../env.json'
import { StorageProvider, STORAGE_KEYS } from '../providers';
import { addScannedPresentation, cleanScannedPresentations } from './scanned-presentations-list/actions';
import { decodeJWT } from 'did-jwt'
import axios from 'axios'
import { requestScanAgain, receiveQrScan } from '../state/localUi/actions';
import { navigate } from '../AppNavigation';
import crypto from 'crypto'

const providerConfig = {
  networks: [
    { name: "rsk:testnet", rpcUrl: RPC_URL, registry: DID_REGISTRY_ADDRESS }
  ]
}
const resolver = new Resolver(getResolver(providerConfig));

const decrypt = async (encryptedData: any, secretKey: string): Promise<string> => {
  const key = crypto.createDecipher('aes-256-cbc', secretKey);
  let decrypted = key.update(encryptedData, 'hex', 'utf8')
  decrypted += key.final('utf8');
  
  return decrypted
}

const getVpJwt = async (data: string, conveyServiceToken: string) => {
  if (!data.startsWith('convey://')) {
    throw new Error('invalid_qr')
  }
  const index = 'convey://'.length
  const identifier = data.substring(index)
  const [cid, encryptionKey] = identifier.split('#')

  if (CONVEY_URL && conveyServiceToken) {
    try {
      const jwt = await axios.get(
          `${CONVEY_URL}/file/${cid}`,
          { headers: { 'Authorization': conveyServiceToken } }
        )
        .then(res => res.status === 200 && !!res.data && res.data.file)
        .then(file => decrypt(file, encryptionKey))
      
      return jwt
    } catch { } // axios throws an error if 404, so in that case, try to get it from the IPFS gateway
  }

  return axios.get(`${IPFS_GATEWAY}/ipfs/${cid}`)
    .then(res => res.status === 200 && res.data)
    .then(file => decrypt(file, encryptionKey))
}

export const scanQR = (
  data: string, scannedPresentations: VerifiedPresentation[], conveyServiceToken: string, navigation: any,
) => async (dispatch: Dispatch) => {
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
    let vpJwt: string;

    getVpJwt(data, conveyServiceToken)
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

  if (credentialDetails.expirationDate && credentialDetails.expirationDate.getTime() <= Date.now()) {
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