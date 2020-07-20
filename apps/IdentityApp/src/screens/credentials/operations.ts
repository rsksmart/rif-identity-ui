import { Dispatch } from 'redux';
import * as RootNavigation from '../../AppNavigation';

import { receiveIsSignedUp, receiveLoggedIn } from '../../state/localUi/actions';
import { StorageProvider, STORAGE_KEYS } from '../../Providers/index';
import { resetProfile } from '../../features/profile/actions';
import { resetCredentials } from '../../features/credentialsView/actions';

export const signOutAndReset = () => async (dispatch: Dispatch) => {
  await StorageProvider.removeAll();
  dispatch(receiveIsSignedUp(false));
  dispatch(receiveLoggedIn(false));
  dispatch(resetProfile());
  dispatch(resetCredentials());
  RootNavigation.navigate('SignupFlow', { screen: 'Welcome' });
};

export const checkPinAndSignIn = (userPin: string) => async (dispatch: Dispatch) => {
  await StorageProvider.get(STORAGE_KEYS.PIN)
    .then(expectedPin => {
      if (userPin === expectedPin) {
        dispatch(receiveLoggedIn(true));
        RootNavigation.navigate('CredentialsFlow', {
          screen: 'CredentialsHome',
        });
      } else {
        dispatch(receiveLoggedIn(false, 'pin_is_incorrect'));
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(receiveLoggedIn(false, 'Count not get storage'));
    });
};
