import { Dispatch } from 'redux';

import { StorageProvider, STORAGE_KEYS } from '../../Providers/index';
import { clearError, pinError } from './actions';
import {
  receiveIsSignedUp,
  receiveLoggedIn,
} from '../../state/localUi/actions';
import * as RootNavigation from '../../AppNavigation';

/**
 * Confirm pin matches, save it to localStorage and move to home screen
 * @param userPin the user confirm pin
 * @param expectedPin the users initial pin
 */
export const checkPinMatchAndSet = (
  userPin: string,
  expectedPin: string,
) => async (dispatch: Dispatch) => {
  console.log('checkPinMatchAndSet', userPin, expectedPin);
  if (userPin !== expectedPin) {
    return dispatch(pinError('PIN did not match'));
  }

  await StorageProvider.set(STORAGE_KEYS.PIN, expectedPin)
    .then(() => {
      dispatch(clearError());
      dispatch(receiveIsSignedUp(true));
      dispatch(receiveLoggedIn(true));
      RootNavigation.navigate('CredentialsFlow', { screen: 'CredentialsHome' });
    })
    .catch(error => {
      console.log('error', error.message);
    });
};

/**
 * Check's the PIN against local Storage and on success, navigates to next screen
 * @param userPin string User's Pin
 */
export const checkPinAndSignIn = (userPin: string) => async (dispatch: Dispatch) => {
  await StorageProvider.get(STORAGE_KEYS.PIN)
    .then(expectedPin => {
      console.log(userPin, expectedPin);
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

