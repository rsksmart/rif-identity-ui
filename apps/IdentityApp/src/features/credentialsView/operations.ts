import { Dispatch } from 'redux';
import axios from 'axios';
import { Credential, CredentialStatus } from './reducer';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';
import { addCredential, requestCredentials, receiveCredentials } from './actions';
import * as RootNavigation from '../../AppNavigation';

export const requestCredential = (
  metaData: any,
) => async (dispatch: Dispatch) => {
  // save credential in redux
  console.log('requesting credential');
  console.log(metaData);

  axios
    .post('http://192.168.0.13:3000/request', metaData)
    .then(function (response) {
      // Create Credential object:
      const credential: Credential = {
        hash: response.data.token,
        status: CredentialStatus.PENDING,
        dateRequested: new Date(),
        type: metaData.type,
      };
      // Add Credential to redux:
      dispatch(addCredential(credential));

      // Save credential to localStorage:
      //@todo!!!!!!!

      // redirect to Credentials Home:
      RootNavigation.navigate('CredentialsFlow', {
        screen: 'CredentialsHome',
      });
    })
    .catch(function (error) {
      console.log(error);
    });

  /*
  

  // save credential to localStorage
  const newCredentialList: Credential[] = [...credentialList, credential];
  await StorageProvider.set(STORAGE_KEYS.SIMPLE_CREDENTIALS, JSON.stringify(newCredentialList))
    .then(() => {
      
    })
    .catch(error => console.log(error));
  */
};

export const getCredentialsFromStorage = () => async (dispatch: Dispatch) => {
  dispatch(requestCredentials());
  await StorageProvider.get(STORAGE_KEYS.SIMPLE_CREDENTIALS)
    .then(credentials => {
      dispatch(receiveCredentials(JSON.parse(credentials)));
    })
    .catch(() => {
      console.log('no credentials storage key');
    });
};
