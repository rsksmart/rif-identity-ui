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
import { putInDataVault } from '../../Providers/DataVaultProvider';
import { getEndpoint } from '../../Providers/Endpoints';
import { agent } from '../../daf/dafSetup';
import { AESSecretBox } from '../../daf/AESSecretBox';
import { serviceAuthenticationFactory } from 'je-id-core/lib/operations/authentication'
import 'text-encoding-polyfill'

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
    { claimType: 'fullName', claimValue: metadata.fullName, essential: true },
    { claimType: 'type', claimValue: metadata.type, essential: true },
    { claimType: 'idNumber', claimValue: metadata.idNumber },
    { claimType: 'city', claimValue: metadata.city },
  ];

  let claims;

  // TODO: The hardcoded values will be set in the issuer app, this is for demo purposes
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
      const data: any = await checkStatusOfCredential(item.issuer, item.hash);
      didUpdate = true;
      let status, jwt;
      if (data.status.toLowerCase() === 'success') {
        status = CredentialStatus.CERTIFIED;
        jwt = data.payload.raw;
        putInDataVault(jwt);
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
