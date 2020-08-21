import { Dispatch } from 'react';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';
import {
  requestEndpointsStorage,
  receiveEndpointsStorage,
  requestSaveEndpoints,
  receiveSaveEndpoints,
} from './actions';
import {
  ISSUER_ENDPOINT,
  TINYQR_ENDPOINT,
  IPFS_GATEWAY_ENDPOINT,
  DATA_VAULT_ENDPOINT,
  RSK_NODE,
} from '@env';
import { EndpointsInterface } from './reducer';

import { receiveIsSignedUp, receiveLoggedIn } from '../../state/localUi/actions';
import { receiveMnemonic } from '../identity/actions';
import { resetCredentials } from '../credentialsView/actions';
import * as RootNavigation from '../../AppNavigation';
import { resetProfile } from '../../features/profile/actions';

export const getEndpointsFromLocalStorage = () => (dispatch: Dispatch) => {
  dispatch(requestEndpointsStorage());

  StorageProvider.get(STORAGE_KEYS.END_POINTS)
    .then((response: string) => dispatch(receiveEndpointsStorage(JSON.parse(response))))
    .catch(() => {
      // no endpoints are saved in localStorage, use ENV:
      dispatch(
        receiveEndpointsStorage({
          issuer: ISSUER_ENDPOINT,
          tinyQr: TINYQR_ENDPOINT,
          ipfs: IPFS_GATEWAY_ENDPOINT,
          dataVault: DATA_VAULT_ENDPOINT,
          rskNode: RSK_NODE,
        }),
      );
    });
};

export const saveEndpointsToLocalStorage = (endpoints: EndpointsInterface) => (
  dispatch: Dispatch,
) => {
  dispatch(requestSaveEndpoints());
  StorageProvider.set(STORAGE_KEYS.END_POINTS, JSON.stringify(endpoints)).then(() => {
    dispatch(receiveSaveEndpoints(endpoints));
  });
};

/**
 * Development feature to reset entire Application.
 */
export const signOutAndReset = () => async (dispatch: Dispatch) => {
  console.log('RESETING APP :)');
  await StorageProvider.removeAll();
  dispatch(receiveIsSignedUp(false));
  dispatch(receiveLoggedIn(false));
  dispatch(receiveMnemonic(false));
  dispatch(resetProfile());
  dispatch(resetCredentials());
  RootNavigation.navigate('SignupFlow', { screen: 'Welcome' });
};
