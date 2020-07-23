import { Dispatch } from 'redux';
import axios from 'axios';
import { keccak256 } from 'js-sha3';
import { Credential, CredentialStatus } from './reducer';
import { requestAllPendingStatus, receiveAllPendingStatus } from './actions';
import { StorageProvider, STORAGE_KEYS, ISSUER_SERVER } from '../../Providers';
import {
  requestCredential,
  receiveCredential,
  requestAllCredentials,
  receiveAllCredentials,
  errorRequestCredential,
} from './actions';
import * as RootNavigation from '../../AppNavigation';

/**
 * Save a Credential Array to LocalStorage
 * @param credentials Credential Array to be stored
 */
const saveAllCredentials = async (credentials: Credential[]) => {
  // Save to localStorage:
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
  await dispatch(getCredentialsFromStorage()).then((existingCredentials: Credential[]) => {
    console.log('existing,', existingCredentials);
    const newData = existingCredentials.concat(credential);
    saveAllCredentials(newData)
      .then(() => {
        // Add Credential to redux:
        dispatch(receiveCredential(credential));

        // Redirect to home:
        RootNavigation.navigate('CredentialsFlow', {
          screen: 'CredentialsHome',
        });
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
export const sendRequestToServer = (metaData: any) => async (dispatch: Dispatch) => {
  dispatch(requestCredential());
  // post to the credential server:
  axios
    .post(ISSUER_SERVER + '/request', metaData)
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
      dispatch(errorRequestCredential(error.message));
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

const checkStatusOfCredential = async (hash: string) => {
  return await axios
    .get(ISSUER_SERVER + '/', {
      params: {
        hash: hash,
      },
    })
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
    saveAllCredentials(resultArray);
  }

  // Add credentials to redux
  dispatch(receiveAllPendingStatus(resultArray));
};
