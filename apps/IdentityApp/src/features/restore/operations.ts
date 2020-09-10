import { Dispatch } from 'redux';
import jwtDecode from 'jwt-decode';
import { AbstractIdentity } from 'daf-core';
import { getFromDataVault, getFromIPFS } from '../../Providers/DataVaultProvider';
import { createRifIdentity } from '../identity/operations';
import * as RootNavigation from '../../AppNavigation';

import {
  requestRestore,
  receiveRestore,
  requestDataVault,
  requestFromIpfs,
  errorNoIdentity,
  errorRestore,
} from './actions';
import { Credential, CredentialStatus } from '../credentialsView/reducer';

import { saveAllCredentials } from '../credentialsView/operations';
import { receiveAllCredentials } from '../credentialsView/actions';
import { JWT } from 'did-jwt-vc/lib/types';
import { resetMnemonicStore } from '../../daf/dafSetup';
import { deleteAllIdentities } from 'jesse-rif-id-core/lib/reducers/identitySlice';
import { Callback } from 'jesse-rif-id-core/src/operations/identity';
/**
 * Restores a wallet from a seed phrase
 * @param seed string Seed with spaces
 */
export const restoreWalletFromUserSeed = (seed: string) => (dispatch: Dispatch) => {
  dispatch(requestRestore());
  // convert to lowercase, replace 2 spaces with 1, trim then split:
  const seedArray = seed.toLowerCase().replace(/\s+/g, ' ').trim().split(' ');

  if (seedArray.length < 12) {
    return dispatch(errorRestore('short_seed_error'));
  }

  const callBack: Callback<AbstractIdentity> = (err, res) => {
    if (err) {
      throw err;
    }
    dispatch(restoreCredentialsFromDataVault());
  };

  dispatch(createRifIdentity(seedArray, callBack));
};

/**
 * Get Hashes from Data Vault
 */
export const restoreCredentialsFromDataVault = () => async (dispatch: Dispatch) => {
  dispatch(requestDataVault());

  getFromDataVault()
    .then(cids => {
      if (!cids || cids.length === 0) {
        return dispatch(errorNoIdentity());
      }

      // FUTURE: support for multiple issuers:
      const issuer = {
        name: 'Issuer',
      };
      dispatch(requestFromIpfs());
      let promiseArray: Promise<Credential>[] = [];
      cids.forEach((hash: string) => {
        promiseArray.push(
          new Promise((resolve, reject) => {
            getFromIPFS(hash)
              .then((data: string) => {
                const jwt: JWT = jwtDecode(data);
                const credential = <Credential>{
                  issuer,
                  status: CredentialStatus.CERTIFIED,
                  hash, // hash is the IPFS hash, but used as the unique identifier.
                  type: jwt.vc.credentialSubject.type,
                  jwt: data,
                };
                resolve(credential);
              })
              .catch(error => reject(error));
          }),
        );
      });

      // save at the end because saving into LocalStorage can erase credentials if saving
      // at the same time.
      Promise.all(promiseArray)
        .then((values: Credential[]) => {
          saveAllCredentials(values);
          dispatch(receiveAllCredentials(values));
          dispatch(receiveRestore());
          RootNavigation.navigate('SignupFlow', { screen: 'PinCreate' });
        })
        .catch(() => {
          dispatch(errorRestore('IPFS Netork Error'));
          dispatch(deleteAllIdentities());
          resetMnemonicStore();
        });
    })
    .catch((err: any) => {
      console.log(err);
      dispatch(errorRestore('Data Vault Network Error'));
      dispatch(deleteAllIdentities());
      resetMnemonicStore();
    });
};
