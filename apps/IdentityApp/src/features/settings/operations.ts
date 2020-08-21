import { StorageProvider, STORAGE_KEYS } from '../../Providers';

import {
  requestEndpointsStorage,
  receiveEndpointsStorage,
  requestSaveEndpoints,
  receiveSaveEndpoints,
} from './actions';
import { ISSUER_ENDPOINT, TINYQR_ENDPOINT, IPFS_GATEWAY_ENDPOINT, DATA_VAULT_ENDPOINT } from '@env';
import { EndpointsInterface } from './reducer';
import { Dispatch } from 'react';

export const getEndpointsFromLocalStorage = () => (dispatch: Dispatch) => {
  dispatch(requestEndpointsStorage());

  StorageProvider.get(STORAGE_KEYS.END_POINTS)
    .then((response: string) => {
      dispatch(receiveEndpointsStorage(JSON.parse(response)));
    })
    .catch(() => {
      // no endpoints are saved in localStorage, use ENV:
      dispatch(
        receiveEndpointsStorage({
          issuer: ISSUER_ENDPOINT,
          tinyQr: TINYQR_ENDPOINT,
          ipfs: IPFS_GATEWAY_ENDPOINT,
          dataVault: DATA_VAULT_ENDPOINT,
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
