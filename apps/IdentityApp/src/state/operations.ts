import { Dispatch } from 'react';
import { Action } from 'redux';
import { changeLanguage } from 'redux-multilanguage';
import { BackHandler, AppState } from 'react-native';
import * as RootNavigation from '../AppNavigation';
import { StorageProvider, STORAGE_KEYS } from '../Providers/index';
import { requestIsSignedUp, receiveIsSignedUp, logout } from './localUi/actions';
import { getEndpointsFromLocalStorage } from '../features/settings/operations';
import { agent } from '../daf/dafSetup';
import { initIdentityFactory } from 'jesse-rif-id-core/lib/operations/identity';
import { initDeclarativeDetailsFactory } from 'jesse-rif-id-core/lib/operations/declarativeDetails';
import { initCredentialRequestsFactory } from 'jesse-rif-id-core/lib/operations/credentialRequests';
import { initCredentialsFactory } from 'jesse-rif-id-core/lib/operations/credentials';

export const initialAppStart = () => async (dispatch: Dispatch<Function | Action>) => {
  dispatch(requestIsSignedUp());
  dispatch(getEndpointsFromLocalStorage());

  const initIdentity = initIdentityFactory(agent);
  dispatch(initIdentity());

  const initDeclarativeDetails = initDeclarativeDetailsFactory(agent);
  dispatch(initDeclarativeDetails());

  const initCredentials = initCredentialsFactory(agent);
  dispatch(initCredentials());

  const initCredentialRequests = initCredentialRequestsFactory(agent);
  dispatch(initCredentialRequests());

  await StorageProvider.get(STORAGE_KEYS.PIN)
    .then(() => {
      dispatch(receiveIsSignedUp(true));
      RootNavigation.navigate('CredentialsFlow', { screen: 'SigninWithPin' });
    })
    .catch(() => {
      dispatch(receiveIsSignedUp(false));
      RootNavigation.navigate('SignupFlow', { screen: 'Welcome' });
    });

  await StorageProvider.get('LANGUAGE')
    .then(res => dispatch(changeLanguage(res)))
    .catch(() => dispatch(changeLanguage('en')));

  // prevent Android back button:
  BackHandler.addEventListener('hardwareBackPress', () => true);

  // log out when the app is minimized:
  AppState.addEventListener('change', (state: string) => state !== 'active' && dispatch(logout()));
};
