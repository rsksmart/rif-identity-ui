import { Dispatch } from "redux";
import {NavigationScreenProp} from "react-navigation";
import {receiveIsSignedUp, receiveLoggedIn} from "../../state/localUi/actions";
import {StorageProvider} from '../../Providers/index';

export const signOutAndReset = (navigation: NavigationScreenProp<any, any>) => async (dispatch: Dispatch) => {
  await StorageProvider.remove('PIN')
    .then(() => {
      dispatch(receiveIsSignedUp(false));
      dispatch(receiveLoggedIn(false));
      navigation.navigate('SignupFlow', { screen: 'Welcome' });
    }).catch((error: string) => console.log(error));

};

export const checkPinAndSignIn = (
  navigation: NavigationScreenProp<any, any>,
  userPin:string
) => async (dispatch: Dispatch) => {
  console.log('checking user pin:', userPin);

  await StorageProvider.get('PIN')
    .then(expectedPin => {
      console.log('pin from storage', expectedPin);
      console.log(userPin === expectedPin);
      if (userPin === expectedPin) {
        console.log('matched!')
        dispatch(receiveLoggedIn(true));
        navigation.navigate('CredentialsFlow', { screen: 'CredentialsHome' });
      } else {
        dispatch(receiveLoggedIn(false, "Pin is Incorrect"));
      }
    })
    .catch(error => {
      console.log(error);
      dispatch(receiveLoggedIn(false, 'Count not get storage'));
    })
}
