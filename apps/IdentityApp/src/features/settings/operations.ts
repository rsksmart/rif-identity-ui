import { Dispatch } from 'redux';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';
import {
  requestEndpointsStorage,
  receiveEndpointsStorage,
  requestSaveEndpoints,
  receiveSaveEndpoints,
} from './actions';

import { defaults } from '../../Providers/Endpoints';
import { EndpointsInterface } from './reducer';
import { dropDafDb } from '../../daf/dafSetup';

export const getEndpointsFromLocalStorage = () => (dispatch: Dispatch) => {
  dispatch(requestEndpointsStorage());

  StorageProvider.get(STORAGE_KEYS.END_POINTS)
    .then((response: string) => dispatch(receiveEndpointsStorage(JSON.parse(response))))
    .catch(() => {
      // no endpoints are saved in localStorage, use ENV:
      dispatch(receiveEndpointsStorage(defaults));
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
export const signOutAndReset = async () => {
  await StorageProvider.removeAll();
  await dropDafDb();
};
