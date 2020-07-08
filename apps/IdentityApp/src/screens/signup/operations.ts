import {NavigationScreenProp} from 'react-navigation';
import {Dispatch} from 'redux';

import {StorageProvider} from '../../Providers/index';
import {clearError, setPinError} from './actions';
import {receiveIsSignedUp, receiveLoggedIn} from '../../state/localUi/actions';

/**
 *
 * @param navigation Navigation object passed from ownProps
 * @param userPin the user confirm pin
 * @param expectedPin the users initial pin
 */
export const checkPinMatchAndSet = (
  navigation: NavigationScreenProp<any, any>,
  userPin: string,
  expectedPin: string,
) => async (dispatch: Dispatch) => {
  console.log('checkPinMatchAndSet', userPin, expectedPin);
  if (userPin !== expectedPin) {
    return dispatch(setPinError('PIN did not match'));
  }

  await StorageProvider.set('PIN', expectedPin)
    .then(() => {
      dispatch(clearError());
      dispatch(receiveIsSignedUp(true));
      dispatch(receiveLoggedIn(true));
      navigation.navigate('CredentialsFlow', {screen: 'CredentialsHome'});
    })
    .catch((error) => {
      console.log('error', error.message);
    });
};
