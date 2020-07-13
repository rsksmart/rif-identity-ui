import { Dispatch } from 'redux';
import * as RootNavigation from '../../AppNavigation';

import {
  receiveIsSignedUp,
  receiveLoggedIn,
} from '../../state/localUi/actions';
import { StorageProvider } from '../../Providers/index';

export const signOutAndReset = () => async (dispatch: Dispatch) => {
  await StorageProvider.remove('PIN')
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
  await StorageProvider.get('PIN')
    .then(expectedPin => {
      if (userPin === expectedPin) {
        dispatch(receiveLoggedIn(true));
        RootNavigation.navigate('CredentialsFlow', {
          screen: 'CredentialsHome',
        });
      } else {
        dispatch(receiveLoggedIn(false, 'Pin is Incorrect'));
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(receiveLoggedIn(false, 'Count not get storage'));
    });
};
