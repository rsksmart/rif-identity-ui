import { Dispatch } from 'redux';
import { AbstractIdentity } from 'daf-core';
import { getFromDataVault, dataVaultKeys } from '../../Providers/IPFSPinnerClient';
import { createRifIdentity } from '../identity/operations';
import * as RootNavigation from '../../AppNavigation';

import { requestRestore, receiveRestore, errorNoIdentity, errorRestore } from './actions';

import { resetMnemonicStore } from '../../daf/dafSetup';
import { setDeclarativeDetailsFactory } from 'jesse-rif-id-core/lib/operations/declarativeDetails';
import { deleteAllIdentitiesFactory } from 'jesse-rif-id-core/lib/operations/identity';
import { agent } from '../../daf/dafSetup';
import { Callback } from 'jesse-rif-id-core/lib/operations/util';
import { receiveCredentialFactory } from 'jesse-rif-id-core/lib/operations/credentials';

/**
 * Helper function to delete identities in redux and the DB.
 * Used when a user needs to double check their mnemonic.
 */
const resetRestoreProcess = () => (dispatch: Dispatch<any>) => {
  const deleteAllIdentities = deleteAllIdentitiesFactory(agent);
  dispatch(deleteAllIdentities(agent.identityManager.getIdentityProviders()[0].type));
  resetMnemonicStore();
};

/**
 * Restores a wallet from a seed phrase
 * @param seed string Seed with spaces
 */
export const restoreWalletFromUserSeed = (seedArray: string[]) => (dispatch: Dispatch<any>) => {
  dispatch(requestRestore());

  if (seedArray.length < 12) {
    return dispatch(errorRestore('short_seed_error'));
  }

  const callBack: Callback<AbstractIdentity> = (err, res) => {
    if (err) {
      dispatch(resetRestoreProcess());
      dispatch(errorRestore('Error creating Identity'));
      throw err;
    }
    dispatch(restoreProfileFromDataVault(res.did));
  };
  dispatch(createRifIdentity(seedArray, callBack));
};

/**
 * Get Declarative Details from the Data Vault
 */
export const restoreProfileFromDataVault = (did: string) => async (dispatch: Dispatch<any>) => {
  // get declarative details from data vault:
  getFromDataVault(dataVaultKeys.DECLARATIVE_DETAILS)
    .then(response => {
      // if mulitiple are saved with this key, get the last one:
      const details = Array.isArray(response) ? response[response.length - 1] : response;
      const declarativeDetails = JSON.parse(details.content);

      const callback = (err: Error) => {
        if (err) {
          console.log(err);
          dispatch(resetRestoreProcess());
          return dispatch(errorRestore('Error from DataVault'));
        }
        dispatch(restoreCredentialsFromDataVault());
      };

      const setDeclarativeDetails = setDeclarativeDetailsFactory(agent);
      dispatch(setDeclarativeDetails(did, declarativeDetails, callback));
    })
    .catch(err => {
      console.log(err);
      dispatch(resetRestoreProcess());
      return dispatch(errorNoIdentity());
    });
};

export const restoreCredentialsFromDataVault = () => async (dispatch: Dispatch<any>) => {
  const receiveCredentialRif = receiveCredentialFactory(agent);
  getFromDataVault(dataVaultKeys.CREDENTIALS)
    .then(credentials => {
      credentials.map((item: any) => dispatch(receiveCredentialRif(JSON.parse(item.content))));

      dispatch(receiveRestore());
      RootNavigation.navigate('SignupFlow', { screen: 'PinCreate' });
    })
    .catch(err => {
      console.log(err);
      dispatch(resetRestoreProcess());
      return dispatch(errorNoIdentity());
    });
};
