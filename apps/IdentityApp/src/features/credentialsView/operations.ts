import { Dispatch } from 'redux';
import axios from 'axios';
import { keccak256 } from 'js-sha3';
import { Credential, CredentialStatus } from './reducer';
import {
  requestAllPendingStatus,
  receiveAllPendingStatus,
  CREDENTIAL_ACTION_TYPES,
} from './actions';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';
import {
  requestCredential,
  receiveCredential,
  requestAllCredentials,
  receiveAllCredentials,
} from './actions';
import * as RootNavigation from '../../AppNavigation';

/**
 * Save Credential to LocalStorage and Redirect to Credentials Home
 * @param credential Credential to be saved
 */
const saveCredentialAndRedirect = (credential: Credential) => async (dispatch: Dispatch) => {
  // get existing array from localStorage:
  const existingCredentials: Array<Credential> = await StorageProvider.get(STORAGE_KEYS.CREDENTIALS)
    .then((response: string) => {
      return JSON.parse(response);
    })
    .catch(() => []);

  // Saveto localStorage:
  const newData = existingCredentials.concat(credential);
  await StorageProvider.set(STORAGE_KEYS.CREDENTIALS, JSON.stringify(newData))
    .then(() => {
      console.log('DATA SAVED');
      // Add Credential to redux:
      dispatch(receiveCredential(credential));

      // Redirect to home:
      RootNavigation.navigate('CredentialsFlow', {
        screen: 'CredentialsHome',
      });
    })
    .catch(error => console.log(error));
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
    .then(credentials => {
      dispatch(receiveAllCredentials(JSON.parse(credentials)));
    })
    .catch(() => {
      // return empty array for credentials
      dispatch(receiveAllCredentials([]));
    });
};

const wait = (timeout: number) => {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
};

export const checkStatusOfCredential = async (hash: string) => {
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
    .catch(null);
};

export const checkStatusOfPendingCredentials = (credentials: Credential[], did: string) => async (
  dispatch: Dispatch,
) => {
  dispatch(requestAllPendingStatus());

  // create new state:
  const resultArray = await Promise.all(
    credentials.map(async (item: Credential) => {
      const jwt = await checkStatusOfCredential(keccak256(did + item.hash));
      return {
        ...item,
        jwt: jwt,
        status: jwt ? CredentialStatus.CERTIFIED : CredentialStatus.DENIED,
      };
    }),
  );

  wait(2000).then(() => {
    dispatch(receiveAllPendingStatus(resultArray));
  });
  console.log(resultArray);
  // resultArray.then(() => console.log('done'));
  /*
  const getData = async () => {
    await Promise.all(
      credentials.map(async (item: Credential) =>
        await checkStatusOfCredential(keccak256(did + item.hash)),
      ),
    ).then(res => console.log('response', res));
  };

  getData();

  const newState = Promise.all(
    credentials.map((item: Credential) => {
      if (item.status !== CredentialStatus.PENDING) {
        return item;
      }

      const getData = async () => ;

      return {
        ...item,
        jwt: async () => checkStatusOfCredential(keccak256(did + item.hash)),
      };
    }),
  );

  newState.then(data => {
    console.log('newState', data);
  });
*/
  
};
