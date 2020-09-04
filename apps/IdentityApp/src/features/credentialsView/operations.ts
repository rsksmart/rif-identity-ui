import { Dispatch } from 'react';
import axios from 'axios';
import { keccak256 } from 'js-sha3';
import EthrDID from 'ethr-did';

import { JwtPresentationPayload, createVerifiablePresentationJwt } from 'did-jwt-vc';
import { Credential, CredentialStatus } from './reducer';
import {
  requestAllPendingStatus,
  receiveAllPendingStatus,
  requestPresentation,
  receivePresentation,
} from './actions';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';
import { serverInterface, CredentialTypes } from '../../Providers/Issuers';
import {
  requestCredential,
  receiveCredential,
  requestAllCredentials,
  receiveAllCredentials,
  errorRequestCredential,
} from './actions';
import * as RootNavigation from '../../AppNavigation';
import { createJWT, SimpleSigner } from 'did-jwt';
import { putInDataVault } from '../../Providers/DataVaultProvider';
import { getEndpoint } from '../../Providers/Endpoints';

/**
 * Save a Credential Array to LocalStorage
 * @param credentials Credential Array to be stored
 */
export const saveAllCredentials = async (credentials: Credential[]) => {
  // Save to localStorage:
  return await StorageProvider.set(STORAGE_KEYS.CREDENTIALS, JSON.stringify(credentials))
    .then(() => {
      console.log('Credentials stored!');
      console.log(JSON.stringify(credentials));

      return Promise.resolve(true);
    })
    .catch(error => Promise.reject(error));
};

/**
 * Prepare a Single Credential to be saved to LocalStorage
 * This is used when a credential is being requested or restored.
 * @param credential Credential to be saved
 */
export const saveCredentialToLocalStorage = (credential: Credential) => async (dispatch: Dispatch) => {
  // get existing array from localStorage:
  await dispatch(getCredentialsFromStorage()).then((existingCredentials: Credential[]) => {
    console.log('existing,', existingCredentials);
    const newData = existingCredentials.concat(credential);
    saveAllCredentials(newData)
      .then(() => {
        // Add Credential to redux:
        console.log('credential saved, adding to redux');
        dispatch(receiveCredential(credential));
      })
      .catch(error => console.log('save Error', error));
  });
};

/**
 * Remove a credential by hash from redux and localStorage.
 * @param hash hash of the credential to be removed
 */
export const removeCredential = (hash: string) => async (dispatch: Dispatch) => {
  // get existing array from localStorage:
  await dispatch(getCredentialsFromStorage()).then((existingCredentials: Credential[]) => {
    const newData = existingCredentials.filter((item: Credential) => item.hash !== hash);
    console.log('newData', newData);
    saveAllCredentials(newData)
      .then(() => {
        // Send new CredentialArray to redux
        dispatch(receiveAllCredentials(newData));
      })
      .catch(error => console.log('save Error', error));
  });
};

/**
 * Sends a request to the Credential Server.
 * @param metaData metaData in the credential
 */
export const sendRequestToServer = (server: serverInterface, did: string, metadata: any) => async (
  dispatch: Dispatch,
) => {
  dispatch(requestCredential());
  if (!server.endpoint || server.endpoint === '') {
    return dispatch(errorRequestCredential('No server connected'));
  }

  const baseClaims = [
    { claimType: 'credentialRequest', claimValue: 'cred1', essential: true }, // or type here?
    { claimType: 'fullName', claimValue: metadata.full_name, essential: true },
    { claimType: 'type', claimValue: metadata.type, essential: true },
    { claimType: 'idNumber', claimValue: metadata.id_number },
    { claimType: 'city', claimValue: metadata.city },
  ];

  let claims;

  // TODO: The hardcoded values will be set in the issuer app, this is for demo purposes
  switch (metadata.type) {
    case CredentialTypes.PARKING_PERMIT:
      claims = [
        ...baseClaims,
        { claimType: 'phone', claimValue: metadata.phone },
        { claimType: 'driversLicenseNumber', claimValue: metadata.drivers_license_number },
      ];
      break;
    case CredentialTypes.DRIVERS_LICENSE:
      claims = [
        ...baseClaims,
        { claimType: 'birthdate', claimValue: metadata.birthdate },
        { claimType: 'driversLicenseNumber', claimValue: metadata.drivers_license_number },
      ];
      break;
    case CredentialTypes.ID:
    default:
      claims = [
        ...baseClaims,
        { claimType: 'phone', claimValue: metadata.phone },
        { claimType: 'birthdate', claimValue: metadata.birthdate },
        { claimType: 'civilStatus', claimValue: metadata.civil_status },
        { claimType: 'email', claimValue: metadata.email },
        { claimType: 'address', claimValue: metadata.address }
      ];
      break;
  }

  const sdrData = {
    issuer: did,
    claims,
    credentials: [],
  };

  StorageProvider.get(STORAGE_KEYS.IDENTITY).then((response: any) => {
    const identity = JSON.parse(response);

    const signer = SimpleSigner(identity.privateKey)
    createJWT(
      {
        type: 'sdr',
        ...sdrData,
      },
      {
        signer,
        alg: 'ES256K-R',
        issuer: did,
      },
    ).then(sdrJwt => {
      const issuer = `did:ethr:rsk:testnet:0xc253a4d5653ea8b1b288a4b45ba67e9a4be865fc`

      const data = {
        from: did,
        to: issuer, // TODO: check if mandatory
        type: 'jwt',
        body: sdrJwt,
      }

      fetch(server.endpoint + '/requestCredential', {
        method: 'POST',
        body: JSON.stringify(data),
      })
        .then((postResponse: Response) => {
          if (postResponse.status !== 200) {
            return postResponse.text().then((errorReason: string) => {
              dispatch(errorRequestCredential(errorReason));
            });
          }
          const hash = keccak256(sdrJwt).toString('hex');

          // Create Credential object:
          const credential: Credential = {
            issuer: {
              name: server.name,
              endpoint: server.endpoint,
            },
            hash,
            status: CredentialStatus.PENDING,
            dateRequested: new Date(),
            type: metadata.type,
            payload: data,
          };
          dispatch(saveCredentialToLocalStorage(credential));

          // Redirect to home:
          RootNavigation.navigate('CredentialsFlow', {
            screen: 'CredentialsHome',
          });
        })
        .catch(function (error) {
          dispatch(errorRequestCredential(error.message));
        });
      })
  });
};

/**
 * Gets the credentials that are stored in localStorage.
 */
export const getCredentialsFromStorage = () => async (dispatch: Dispatch) => {
  dispatch(requestAllCredentials());
  return await StorageProvider.get(STORAGE_KEYS.CREDENTIALS)
    .then((credentials: string) => {
      dispatch(receiveAllCredentials(JSON.parse(credentials)));
      return Promise.resolve(JSON.parse(credentials));
    })
    .catch(() => {
      // return empty array for credentials
      dispatch(receiveAllCredentials([]));
      return Promise.resolve([]);
    });
};

export const checkStatusOfCredential = async (server: serverInterface, hash: string) => {
  console.log('checking status.');
  return await axios
    .get(server.endpoint + `/receiveCredential/?hash=${hash}`)
    .then((response: { data: string }) => {
      return Promise.resolve(response.data);
    })
    .catch(() => {
      return Promise.resolve(null);
    });
};

/**
 * Check the status of Credentials, get new status, and send new array
 * to be saved in localStorage and redux.
 * @param credentials Credential Array to be checked and then saved
 * @param did The users' DID
 * @param selectStatus Only check credentials with this status
 */
export const checkStatusOfCredentials = (
  credentials: Credential[],
  did: string,
  selectStatus: CredentialStatus | null,
) => async (dispatch: Dispatch) => {
  dispatch(requestAllPendingStatus());

  // create new state:
  let didUpdate = false;
  const resultArray: Credential[] = await Promise.all(
    credentials.map(async (item: Credential) => {
      if (selectStatus && item.status !== selectStatus) {
        return item;
      }
      const data: any = await checkStatusOfCredential(
        item.issuer,
        item.hash,
      );
      didUpdate = true;
      
      let status, jwt;
      console.log(data.status)
      if (data.status.toLowerCase() === 'success') {
        status = CredentialStatus.CERTIFIED;
        jwt = data.payload.raw;
        putInDataVault(jwt);
      } else if (data.status.toLowerCase() === 'denied') {
        status = CredentialStatus.DENIED
      } else {
        status = CredentialStatus.PENDING
      }

      return {
        ...item, jwt, status
      };
    }),
  );

  // save new state to localStorage
  if (didUpdate) {
    saveAllCredentials(resultArray);
  }

  // Add credentials to redux
  dispatch(receiveAllPendingStatus(resultArray));
};

/**
 * Create presentation of a VC using the JWT, and the address and private key of the
 * holder who is issuing the presentation.
 * @param jwt JWT of the credential to be presented
 * @param address address of the holder
 */
export const createPresentation = (jwt: string) => async (dispatch: Dispatch) => {
  dispatch(requestPresentation());
  const vpPayload: JwtPresentationPayload = {
    vp: {
      '@context': ['https://www.w3.org/2018/credentials/v1'],
      type: ['VerifiablePresentation'],
      verifiableCredential: [jwt],
    },
    nbf: Math.floor(new Date().getTime() / 1000),
    exp: Math.floor(new Date().getTime() / 1000) + 600,
  };

  StorageProvider.get(STORAGE_KEYS.IDENTITY).then((response: string) => {
    const identity = JSON.parse(response);
    const holder = new EthrDID({ address: identity.address, privateKey: identity.privateKey });
    createVerifiablePresentationJwt(vpPayload, holder)
      .then(uploadPresentation)
      .then(([res, hash]) => dispatch(receivePresentation(res.data.url, res.data.pwd, hash)));
  });
};

const uploadPresentation = async (jwt: string) => {
  const tinyServer = await getEndpoint('tinyQr');
  const request = axios.post(`${tinyServer}/presentation`, { jwt });
  const hashFn = keccak256(jwt);

  return Promise.all([request, hashFn]);
};
