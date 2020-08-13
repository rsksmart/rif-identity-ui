import { Dispatch } from 'react';
import axios, { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import { ISSUER_NAME, IPFS_GATEWAY_ENDPOINT } from '@env';
import { getFromDataVault } from '../../Providers/DataVaultProvider';
import { saveIdentityToLocalStorage } from '../identity/operations';

import {
  restoreSeedError,
  requestRestore,
  receiveRestore,
  requestDataVault,
  receiveDataVault,
} from './actions';
import { Credential, CredentialStatus, CredentialTypes } from '../credentialsView/reducer';

import { saveAllCredentials } from '../credentialsView/operations';
import { receiveAllCredentials } from '../credentialsView/actions';

/**
 * Restores a wallet from a seed phrase
 * @param seed string Seed with spaces
 */
export const restoreWalletFromUserSeed = (seed: string) => async (dispatch: Dispatch) => {
  dispatch(requestRestore());

  return new Promise((resolve, reject) => {
    const seedArray = seed.split(' ');

    if (seedArray.length < 12) {
      return reject(dispatch(restoreSeedError('short_seed_error')));
    }

    dispatch(saveIdentityToLocalStorage(seedArray)).then(() => {
      dispatch(restoreCredentialsFromDataVault());
      resolve(dispatch(receiveRestore()));
    });
  });
};

/**
 * Get Hashes from Data Vault
 */
export const restoreCredentialsFromDataVault = () => async (dispatch: Dispatch) => {
  dispatch(requestDataVault());

  console.log('getting hashes!');
  getFromDataVault().then(cids => {
    if (cids.length === 0) {
      return;
    }

    // FUTURE: support for multiple issuers:
    const issuer = {
      name: ISSUER_NAME,
    };

    let promiseArray = [];
    cids.forEach((hash: string) => {
      promiseArray.push(
        new Promise(resolve => {
          return axios.get(`${IPFS_GATEWAY_ENDPOINT}/${hash}`).then((response: AxiosResponse) => {
            const jwt = jwtDecode(response.data);
            const credential = <Credential>{
              issuer,
              status: CredentialStatus.CERTIFIED,
              hash, // hash is the IPFS hash, but used as the unique identifier.
              type: jwt.vc.credentialSubject.type,
              jwt: response.data,
            };
            resolve(credential);
          });
        }),
      );
    });

    // save at the end because saving into LocalStorage can erase credentials if saving
    // at the same time.
    Promise.all(promiseArray).then((values: Credential[]) => {
      saveAllCredentials(values);
      dispatch(receiveAllCredentials(values));
      dispatch(receiveDataVault());
    });
  });
};
