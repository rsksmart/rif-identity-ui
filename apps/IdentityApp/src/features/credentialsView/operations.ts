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
import * as RootNavigation from '../../AppNavigation';
import { getEndpoint } from '../../Providers/Endpoints';
import { agent } from '../../daf/dafSetup';
import { AESSecretBox } from '../../daf/AESSecretBox';
import { serviceAuthenticationFactory } from 'je-id-core/lib/operations/authentication'
import 'text-encoding-polyfill'
import { receiveCredentialFactory } from 'jesse-rif-id-core/lib/operations/credentials';
import { issueCredentialRequestFactory } from 'jesse-rif-id-core/lib/operations/credentialRequests';
import { addIssuedCredentialRequest } from 'jesse-rif-id-core/lib/reducers/issuedCredentialRequests';
import { Callback } from 'jesse-rif-id-core/lib/operations/util';
import {
  dataVaultKeys,
  putInDataVault,
  findCredentialAndDelete,
} from '../../Providers/IPFSPinnerClient';

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
 * Remove a credential by hash from redux and localStorage.
 * @param hash hash of the credential to be removed
 */
export const removeCredential = (did: string, hash: string) => async (dispatch: Dispatch<any>) => {
  // Remove from old version:
  dispatch(getCredentialsFromStorage()).then((existingCredentials: Credential[]) => {
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
 * Remove an issued credential from the local database and the data vault
 * @param did string DID of the user
 * @param raw string the raw jwt used for the data vault lookup
 * @param hash string hash of the credential
 * @param callback function function called when found
 */
export const removeIssuedCredential = (
  did: string,
  raw: string,
  hash: string,
  callback?: Callback<Credential> | undefined,
) => (dispatch: Dispatch<any>) =>
  findCredentialAndDelete(raw)
    .then(() => {
      const deleteCredential = deleteCredentialFactory(agent);
      dispatch(deleteCredential(did, hash, callback));
    })
    .catch(err => console.log('DV error', err));

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
export const sendRequestToServer = (server: serverInterface, did: string, metadata: any) => async (
  dispatch: Dispatch,
) => {
  dispatch(requestCredential());
  if (!server.endpoint || server.endpoint === '') {
    return dispatch(errorRequestCredential('No server connected'));
  }

  const claims = createClaim(metadata);

  console.log('identity:', did);
  console.log('claims:', claims);
  const issueCredentialRequest = issueCredentialRequestFactory(agent);
  const callback = (err: Error, res: any) => {
    console.log('callback :)');
    console.log('err', err);
    console.log('res', res);

    RootNavigation.navigate('CredentialsFlow', {
      screen: 'CredentialsHome',
    });
  };

  console.log('requesting...');
  dispatch(
    issueCredentialRequest(
      did,
      'did:ethr:rsk:testnet:0xdcbe93e98e0dcebe677c39a84f5f212b85ba7ef0',
      claims,
      'pending',
      server.endpoint + '/requestCredential',
      callback,
    ),
  );

  /*
  const sdrData = {
    issuer: did,
    claims,
    credentials: [],
  };

  const sdrJwt = await agent.handleAction({
    type: 'sign.sdr.jwt',
    data: sdrData,
  });

  const didCommData = {
    from: did,
    to: 'did:ethr:rsk:testnet:0x37309bf0fcda162ad7d2c154b305b996621767b9',
    type: 'jwt',
    body: sdrJwt,
  };

  await agent
    .handleAction({
      type: 'send.message.didcomm-alpha-1',
      data: didCommData,
      url: server.endpoint + '/requestCredential',
      save: true,
    })
    .then(response => {
      // Create Credential object:
      const credential: Credential = {
        issuer: {
          name: server.name,
          endpoint: server.endpoint,
        },
        hash: keccak256(sdrJwt).toString('hex'),
        status: CredentialStatus.PENDING,
        dateRequested: new Date(),
        type: metadata.type,
      };

      dispatch(saveCredentialToLocalStorage(credential));
      // Redirect to home:
      RootNavigation.navigate('CredentialsFlow', {
        screen: 'CredentialsHome',
      });
    });
  */
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
