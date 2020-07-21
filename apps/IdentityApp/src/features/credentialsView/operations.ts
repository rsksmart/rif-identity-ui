import { Dispatch } from 'redux';
import axios from 'axios';
import { Credential, CredentialStatus } from './reducer';
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
  console.log('saving', credential);
  // get existing array from localStorage:
  const existingCredentials: Array<Credential> = await StorageProvider.get(STORAGE_KEYS.CREDENTIALS)
    .then((response: string) => {
      return JSON.parse(response);
    })
    .catch(() => []);

  // Saveto localStorage:
  const newData = existingCredentials.concat(credential);
  console.log('newData', newData);
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
