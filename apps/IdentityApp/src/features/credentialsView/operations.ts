import { Dispatch } from 'redux';
import axios from 'axios';
import { keccak256 } from 'js-sha3';

import { Credential, CredentialStatus } from './reducer';
import {
  requestAllPendingStatus,
  receiveAllPendingStatus,
  requestPresentation,
  receivePresentation,
  errorReceivePresentation,
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
import { getEndpoint } from '../../Providers/Endpoints';
import { agent, dbConnection } from '../../daf/dafSetup';
import { AESSecretBox } from '../../daf/AESSecretBox';
import { serviceAuthenticationFactory } from 'je-id-core/lib/operations/authentication'
import 'text-encoding-polyfill'
import {
  deleteCredentialFactory,
  receiveCredentialFactory,
} from 'jesse-rif-id-core/lib/operations/credentials';
import {
  deleteIssuedCredentialRequestFactory,
  issueCredentialRequestFactory,
  setIssuedCredentialRequestStatusFactory,
} from 'jesse-rif-id-core/lib/operations/credentialRequests';
import {
  addIssuedCredentialRequest,
  IssuedCredentialRequest,
} from 'jesse-rif-id-core/lib/reducers/issuedCredentialRequests';
import { Callback } from 'jesse-rif-id-core/lib/operations/util';
import {
  dataVaultKeys,
  putInDataVault,
  findCredentialAndDelete,
} from '../../Providers/IPFSPinnerClient';
import { Credential as RifCredential } from 'jesse-rif-id-core/src/reducers/credentials';
import { findOneCredentialRequest } from 'jesse-rif-id-core/lib/entities/CredentialRequest';

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
export const saveCredentialToLocalStorage = (credential: Credential) => async (
  dispatch: Dispatch<any>,
) => {
  // get existing array from localStorage:
  await dispatch(getCredentialsFromStorage()).then((existingCredentials: Credential[]) => {
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
 * Remove an issued credential from the local database and the data vault
 * @param credential the credential that should be removed
 * @param callback function function called after deletion
 */
export const removeIssuedCredential = (
  credential: RifCredential,
  callback: Callback<Credential>,
) => (dispatch: Dispatch<any>) =>
  findCredentialAndDelete(credential.raw)
    .then(() => {
      const deleteCredential = deleteCredentialFactory(agent);
      dispatch(deleteCredential(credential.subject, credential.hash, callback));
    })
    .catch(err => console.log('DV error', err));

/**
 * Remove Requestd Credential
 * @param request the credential request
 * @param callback function function called after deletion
 */
export const removeRequestedCredential = (
  request: IssuedCredentialRequest,
  callback: Callback<void>,
) => (dispatch: Dispatch<any>) => {
  const deleteCredentialRequest = deleteIssuedCredentialRequestFactory(agent);
  dispatch(deleteCredentialRequest(request.from, request.id, callback));
};

/**
 * Create Claims Data for the different credential types
 * @param metadata metadata from the app
 */
const createClaim = (metadata: any) => {
  const baseClaims = [
    { claimType: 'credentialRequest', claimValue: 'cred1', essential: true },
    { claimType: 'fullName', claimValue: metadata.fullName, essential: true },
    { claimType: 'type', claimValue: metadata.type, essential: true },
    { claimType: 'idNumber', claimValue: metadata.idNumber },
    { claimType: 'city', claimValue: metadata.city },
  ];

  let claims;
  switch (metadata.type) {
    case CredentialTypes.PARKING_PERMIT:
      claims = [
        ...baseClaims,
        { claimType: 'phone', claimValue: metadata.phone },
        { claimType: 'driversLicenseNumber', claimValue: metadata.driversLicenseNumber },
      ];
      break;
    case CredentialTypes.DRIVERS_LICENSE:
      claims = [
        ...baseClaims,
        { claimType: 'birthdate', claimValue: metadata.birthdate },
        { claimType: 'driversLicenseNumber', claimValue: metadata.driversLicenseNumber },
      ];
      break;
    case CredentialTypes.ID:
    default:
      claims = [
        ...baseClaims,
        { claimType: 'phone', claimValue: metadata.phone },
        { claimType: 'birthdate', claimValue: metadata.birthdate },
        { claimType: 'civilStatus', claimValue: metadata.civilStatus },
        { claimType: 'email', claimValue: metadata.email },
        { claimType: 'address', claimValue: metadata.address },
      ];
      break;
  }

  return claims;
};

/**
 * Sends a request to the Credential Server.
 * @param metaData metaData in the credential
 */
export const sendRequestToServer = (did: string, metadata: any, callback: Callback<any>) => async (
  dispatch: Dispatch<any>,
) => {
  dispatch(requestCredential());

  getEndpoint('issuer').then((endpoint: string) => {
    const claims = createClaim(metadata);
    const issueCredentialRequest = issueCredentialRequestFactory(agent);
    dispatch(
      issueCredentialRequest(
        did,
        'did:ethr:rsk:testnet:0xdcbe93e98e0dcebe677c39a84f5f212b85ba7ef0',
        claims,
        'pending',
        endpoint + '/requestCredential',
        callback,
      ),
    );
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

export const checkStatusOfCredential = (hash: string) =>
  getEndpoint('issuer').then(url =>
    axios
      .get(`${url}/receiveCredential/?hash=${hash}`)
      .then((response: { data: string }) => {
        return Promise.resolve(response.data);
      })
      .catch(() => {
        return Promise.resolve(null);
      }),
  );

/**
 * Helper function to get the hash of a request
 * @param id id of the credential request
 */
const getHashByRequestId = (id: string) =>
  dbConnection.then(connection =>
    findOneCredentialRequest(connection, id)
      .then(response => (keccak256(response.message.raw) as any).toString('hex'))
      .catch(err => console.log('hash error', err)),
  );

export const checkStatusOfRequestedCredentials = (
  did: string,
  requestedCredentials: IssuedCredentialRequest[],
) => (dispatch: Dispatch<any>) => {
  const setIssuedCredentialStatus = setIssuedCredentialRequestStatusFactory(agent);
  const deleteIssuedCredential = deleteIssuedCredentialRequestFactory(agent);
  const receiveCredentialRif = receiveCredentialFactory(agent);

  console.log('checking status of requested');
  requestedCredentials.forEach((request: IssuedCredentialRequest) => {
    if (request.status === 'pending') {
      console.log('checking ', request.id);
      console.log('did', did);
      getHashByRequestId(request.id)
        .then(hash => {
          checkStatusOfCredential(hash)
            .then(result => {
              switch (result.status) {
                case 'DENIED':
                  dispatch(setIssuedCredentialStatus(did, request.id, 'DENIED'));
                  break;
                case 'SUCCESS':
                  const callback = (err, res) => {
                    if (err) {
                      throw err;
                    }
                    if (res) {
                      putInDataVault(dataVaultKeys.CREDENTIALS, res.payload.credential.raw)
                        .then(value => console.log('DV success', value))
                        .catch(dverr => console.log('DV err', dverr));
                    }
                  };
                  dispatch(deleteIssuedCredential(did, request.id));
                  dispatch(receiveCredentialRif(result.payload.raw, callback));
                  break;
                case 'ISSUED':
                  console.log('ISSUED: id', result.id);
                  break;
                default:
                  break;
              }
            })
            .catch(err => console.log('check err', err));
        })
        .catch(err => {
          console.log('an error', err);
        });
    }
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
      const data: any = await checkStatusOfCredential(item.issuer, item.hash);
      didUpdate = true;
      let status, jwt;
      if (data.status.toLowerCase() === 'success') {
        status = CredentialStatus.CERTIFIED;
        jwt = data.payload.raw;

        const callback = (err: Error, res: any) => {
          if (err) {
            throw err;
          }
          if (res) {
            console.log('saving:', res.payload.credential.raw);
            putInDataVault(dataVaultKeys.CREDENTIALS, res.payload.credential.raw)
              .then(value => console.log('DV success', value))
              .catch(dverr => console.log('DV err', dverr));
          }
        };

        const receiveCredentialRif = receiveCredentialFactory(agent);
        dispatch(receiveCredentialRif(jwt, callback));
      } else if (data.status.toLowerCase() === 'denied') {
        status = CredentialStatus.DENIED;
      } else {
        status = CredentialStatus.PENDING;
      }

      return {
        ...item,
        jwt,
        status,
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
 * Create presentation of a VC using the JWT and the identityManger in the agent.
 * @param jwt JWT of the credential to be presented
 */
export const createPresentation = (jwt: string, serviceToken: string) => async (dispatch: Dispatch) => {
  dispatch(requestPresentation());
  agent.identityManager.getIdentities().then(identities => {
    agent
      .handleAction({
        type: 'sign.w3c.vp.jwt',
        data: {
          issuer: identities[0].did,
          '@context': ['https://www.w3.org/2018/credentials/v1'],
          type: ['VerifiablePresentation'],
          verifiableCredential: [jwt],
          nbf: Math.floor(new Date().getTime() / 1000),
          exp: Math.floor(new Date().getTime() / 1000) + 600,
        },
      })
      .then(sdrJwt => sdrJwt._raw)
      .then(jwt => uploadPresentation(jwt, serviceToken)(dispatch))
      .then(uri => dispatch(receivePresentation(uri)))
      .catch((err) => { console.log(err); dispatch(errorReceivePresentation()) })
  });
};

const validateCid = async (encrypted: string, actual: string) => {
  // TODO: should calculate the encrypted hash and compare it with the actual one. The must be equals
}

const doUpload = async (vpJwt: string, serviceToken: string, conveyUrl: string) => {
  const key = await AESSecretBox.createSecretKey()
  const secretBox = new AESSecretBox(key)
  const encrypted = await secretBox.encrypt(vpJwt)

  const resp = await axios.post(`${conveyUrl}/file`, { file: encrypted }, { headers: { 'Authorization': serviceToken }})

  // await validateCid(encrypted, resp.data.cid)

  return `${resp.data.url}#${key}`
}

const uploadPresentation = (vpJwt: string, serviceToken: string) => async (dispatch: Dispatch) => {
  const conveyUrl = await getEndpoint('convey')

  if (!serviceToken) {
    const conveyDid = await getEndpoint('conveyDid')
    const identities = await agent.identityManager.getIdentities()

    const doConveyServiceAuth = serviceAuthenticationFactory(agent)
    serviceToken = await doConveyServiceAuth(conveyUrl, conveyDid, identities[0].did)(dispatch)
  }

  return doUpload(vpJwt, serviceToken!, conveyUrl)
}
