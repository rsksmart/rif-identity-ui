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
