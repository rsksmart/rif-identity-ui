import { Dispatch } from 'react';
import { changeLanguage } from 'redux-multilanguage';
import * as RootNavigation from '../AppNavigation';
import { StorageProvider, STORAGE_KEYS } from '../Providers/index';
import { requestIsSignedUp, receiveIsSignedUp } from './localUi/actions';
import { getMnemonicFromLocalStorage } from '../features/identity/operations';

export const initialAppStart = () => async (dispatch: Dispatch) => {
  dispatch(requestIsSignedUp());
  dispatch(getMnemonicFromLocalStorage());

  await StorageProvider.get(STORAGE_KEYS.PIN)
    .then(res => {
      console.log('CREDENTIALS!', res);
      dispatch(receiveIsSignedUp(true));
      RootNavigation.navigate('CredentialsFlow', { screen: 'SigninWithPin' });
    })
    .catch(() => {
      console.log('WELCOME!');
      dispatch(receiveIsSignedUp(false));
      RootNavigation.navigate('SignupFlow', { screen: 'Welcome' });
    });

  await StorageProvider.get('LANGUAGE')
    .then(res => dispatch(changeLanguage(res)))
    .catch(() => dispatch(changeLanguage('en')));
};
