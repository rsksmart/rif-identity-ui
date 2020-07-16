import { Credential } from './reducer';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';
import { addCredential, requestCredentials, receiveCredentials } from './actions';
import * as RootNavigation from '../../AppNavigation';

export const requestCredential = (credential: Credential, credentialList: Credential[]) => async (dispatch: Dispatch) => {
  // save credential in redux
  dispatch(addCredential(credential));

  // save credential to localStorage
  const newCredentialList: Credential[] = [...credentialList, credential];
  await StorageProvider.set(STORAGE_KEYS.SIMPLE_CREDENTIALS, JSON.stringify(newCredentialList))
    .then(() => {
      RootNavigation.navigate('CredentialsFlow', {
        screen: 'CredentialsHome',
      });
    })
    .catch(error => console.log(error));
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
