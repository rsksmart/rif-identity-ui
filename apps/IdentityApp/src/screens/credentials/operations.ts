import { Dispatch } from 'redux';
import * as RootNavigation from '../../AppNavigation';

import {
  receiveIsSignedUp,
  receiveLoggedIn,
} from '../../state/localUi/actions';
import { StorageProvider, STORAGE_KEYS } from '../../Providers/index';

export const signOutAndReset = () => async (dispatch: Dispatch) => {
  await StorageProvider.remove(STORAGE_KEYS.PIN)
    .then(() => {
      dispatch(receiveIsSignedUp(false));
      dispatch(receiveLoggedIn(false));
      RootNavigation.navigate('SignupFlow', { screen: 'Welcome' });
    })
    .catch((error: string) => console.log(error));
};

export const checkPinAndSignIn = (userPin: string) => async (
  dispatch: Dispatch,
) => {
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
