import { Dispatch } from 'react';
import jwtDecode from 'jwt-decode';
import { getFromDataVault, getFromIPFS } from '../../Providers/DataVaultProvider';
import { saveIdentityToLocalStorage } from '../identity/operations';
import * as RootNavigation from '../../AppNavigation';

import {
  restoreSeedError,
  requestRestore,
  receiveRestore,
  requestDataVault,
  requestFromIpfs,
} from './actions';
import { Credential, CredentialStatus } from '../credentialsView/reducer';

import { saveAllCredentials } from '../credentialsView/operations';
import { receiveAllCredentials } from '../credentialsView/actions';
import { JWT } from 'did-jwt-vc/lib/types';

/**
 * Restores a wallet from a seed phrase
 * @param seed string Seed with spaces
 */
export const restoreWalletFromUserSeed = (seed: string) => async (dispatch: Dispatch) => {
  dispatch(requestRestore());
  // convert to lowercase, replace 2 spaces with 1, trim then split:
  const seedArray = seed.toLowerCase().replace(/\s+/g, ' ').trim().split(' ');

  if (seedArray.length < 12) {
    return dispatch(restoreSeedError('short_seed_error'));
  }

  dispatch(saveIdentityToLocalStorage(seedArray)).then(() => {
    dispatch(restoreCredentialsFromDataVault());
  });
};

/**
 * Get Hashes from Data Vault
 */
export const restoreCredentialsFromDataVault = () => async (dispatch: Dispatch) => {
  dispatch(requestDataVault());

  getFromDataVault().then(cids => {
    if (!cids || cids.length === 0) {
      RootNavigation.navigate('SignupFlow', { screen: 'PinCreate' });
      return dispatch(receiveRestore());
    }

    // FUTURE: support for multiple issuers:
    const issuer = {
      name: 'Issuer',
    };
    dispatch(requestFromIpfs());
    let promiseArray: Promise<Credential>[] = [];
    cids.forEach((hash: string) => {
      promiseArray.push(
        new Promise(resolve => {
          getFromIPFS(hash).then((data: string) => {
            const jwt: JWT = jwtDecode(data);
            const credential = <Credential>{
              issuer,
              status: CredentialStatus.CERTIFIED,
              hash, // hash is the IPFS hash, but used as the unique identifier.
              type: jwt.vc.credentialSubject.type,
              jwt: data,
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
      dispatch(receiveRestore());
      RootNavigation.navigate('SignupFlow', { screen: 'PinCreate' });
    });
  });
};
