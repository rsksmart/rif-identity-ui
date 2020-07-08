import { Dispatch } from "redux";
import {NavigationScreenProp} from "react-navigation";
import {receiveIsSignedUp} from "../../state/localUi/actions";
import {StorageProvider} from '../../Providers/index';

export const signOutAndReset = (navigation: NavigationScreenProp<any, any>) => async (dispatch: Dispatch) => {
  console.log('Signing out');

  await StorageProvider.remove('PIN')
    .then(() => {
      dispatch(receiveIsSignedUp(false));
      navigation.navigate('WelcomeHome', { screen: 'Welcome' });
    }).catch((error: string) => console.log(error));

};
