import { Dispatch } from 'redux';
import axios from 'axios';
import { keccak256 } from 'js-sha3';
import { Credential, CredentialStatus } from './reducer';
import { requestAllPendingStatus, receiveAllPendingStatus } from './actions';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';
import {
  requestCredential,
  receiveCredential,
  requestAllCredentials,
  receiveAllCredentials,
} from './actions';
import * as RootNavigation from '../../AppNavigation';

/**
 * Save a Credential Array to LocalStorage
 * @param credentials Credential Array to be stored
 */
const saveAllCredentials = async (credentials: Credential[]) => {
  // Saveto localStorage:
  return await StorageProvider.set(STORAGE_KEYS.CREDENTIALS, JSON.stringify(credentials))
    .then(() => {
      return Promise.resolve(true);
    })
    .catch(error => Promise.reject(error));
};

/**
 * Prepare a Single Credential to be saved to LocalStorage and Redirect to Credentials Home
 * This is used when a credential is being requested.
 * @param credential Credential to be saved
 */
const saveCredentialAndRedirect = (credential: Credential) => async (dispatch: Dispatch) => {
  // get existing array from localStorage:
  const existingCredentials: Array<Credential> = await StorageProvider.get(STORAGE_KEYS.CREDENTIALS)
    .then((response: string) => {
      return JSON.parse(response);
    })
    .catch(() => []);

  const newData = existingCredentials.concat(credential);
  saveAllCredentials(newData).then(() => {
    // Add Credential to redux:
    dispatch(receiveCredential(credential));

    // Redirect to home:
    RootNavigation.navigate('CredentialsFlow', {
      screen: 'CredentialsHome',
    });
  });
};

/**
 * Sends a request to the Credential Server.
 * @param metaData metaData in the credential
 */
export const sendRequestToServer = (metaData: any) => async (dispatch: Dispatch) => {
  dispatch(requestCredential());
  // post to the credential server:
  await axios
    .post('http://192.168.0.13:3000/request', metaData)
    .then(function (response) {
      // Create Credential object:
      console.log('hash', response.data.token);
      const credential: Credential = {
        hash: response.data.token,
        status: CredentialStatus.PENDING,
        dateRequested: new Date(),
        type: metaData.type,
      };
      dispatch(saveCredentialAndRedirect(credential));
    })
    .catch(function (error) {
      console.log(error);
    });
};

/**
 * Gets the credentials that are stored in localStorage
 */
export const getCredentialsFromStorage = () => async (dispatch: Dispatch) => {
  dispatch(requestAllCredentials());
  await StorageProvider.get(STORAGE_KEYS.CREDENTIALS)
    .then((credentials: string) => {
      return dispatch(receiveAllCredentials(JSON.parse(credentials)));
    })
    .catch(() => {
      // return empty array for credentials
      dispatch(receiveAllCredentials([]));
    });
};

// simulate a slow server! :)
const wait = (timeout: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

const checkStatusOfCredential = async (hash: string) => {
  console.log('hash:', hash);
  return await axios
    .get('http://192.168.0.13:3000/', {
      params: {
        hash: hash,
      },
    })
    .then((response: { data: string }) => {
      console.log('response', response.data);
      return Promise.resolve(response.data);
    })
    .catch(() => {
      return Promise.resolve(null);
    });
};

/**
 * Check the status of Credentials with a pending status, get new status, and send new array
 * to be saved in localStorage and redux.
 * @param credentials Credential Array to be checked and then saved
 * @param did The users' DID
 */
export const checkStatusOfPendingCredentials = (credentials: Credential[], did: string) => async (
  dispatch: Dispatch,
) => {
  dispatch(requestAllPendingStatus());

  // create new state:
  let didUpdate = false;
  const resultArray: Credential[] = await Promise.all(
    credentials.map(async (item: Credential) => {
      if (item.status !== CredentialStatus.PENDING) {
        return item;
      }
      const jwt = await checkStatusOfCredential(keccak256(did + item.hash));
      didUpdate = true;
      return {
        ...item,
        jwt: jwt,
        status: jwt ? CredentialStatus.CERTIFIED : CredentialStatus.DENIED,
      };
    }),
  );

  // save new state to localStorage
  if (didUpdate) {
    console.log('save all :)');
    saveAllCredentials(resultArray);
  }

  // Add credentials to redux
  wait(2000).then(() => {
    dispatch(receiveAllPendingStatus(resultArray));
  });
};
