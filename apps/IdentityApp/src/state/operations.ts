import { Dispatch } from 'react';
import { changeLanguage } from 'redux-multilanguage';
import * as RootNavigation from '../AppNavigation';
import { StorageProvider, STORAGE_KEYS } from '../Providers/index';
import { requestIsSignedUp, receiveIsSignedUp } from './localUi/actions';
import { getEndpointsFromLocalStorage } from '../features/settings/operations';
import { agent } from '../daf/dafSetup';
import { initIdentityFactory } from '@rsksmart/rif-id-core/lib/operations/identity';
import { initDeclarativeDetailsFactory } from '@rsksmart/rif-id-core/lib/operations/declarativeDetails';
import { getEndpoint } from '../Providers/Endpoints';
import { serviceLoginFactory } from 'je-id-core/lib/operations/authentication'
import { initCredentialsFactory } from 'jesse-rif-id-core/lib/operations/credentials';

export const initialAppStart = () => async (dispatch: Dispatch) => {
  dispatch(requestIsSignedUp());
  dispatch(getEndpointsFromLocalStorage());

  const initIdentity = initIdentityFactory(agent);
  dispatch(initIdentity());

  const initDeclarativeDetails = initDeclarativeDetailsFactory(agent);
  dispatch(initDeclarativeDetails());

  // console.log('dbConnection');
  // console.log((await dbConnection).entityMetadatas);

  const initCredentials = initCredentialsFactory(agent);
  dispatch(initCredentials());

  await StorageProvider.get(STORAGE_KEYS.PIN)
    .then(res => {
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
};
