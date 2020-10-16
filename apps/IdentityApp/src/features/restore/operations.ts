import { Dispatch } from 'redux';
import { AbstractIdentity } from 'daf-core';
import { getFromDataVault, dataVaultKeys } from '../../Providers/IPFSPinnerClient';
import { createRifIdentity } from '../identity/operations';
import * as RootNavigation from '../../AppNavigation';

import { requestRestore, receiveRestore, errorNoIdentity, errorRestore } from './actions';

import { resetMnemonicStore } from '../../daf/dafSetup';
import { setDeclarativeDetailsFactory } from '@rsksmart/rif-id-core/lib/operations/declarativeDetails';
import { deleteAllIdentitiesFactory } from '@rsksmart/rif-id-core/lib/operations/identity';
import { agent } from '../../daf/dafSetup';
import { Callback } from '@rsksmart/rif-id-core/lib/operations/util';
import { receiveCredentialFactory } from '@rsksmart/rif-id-core/lib/operations/credentials';

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

      const callback = (err: Error | undefined) => {
        if (err) {
          console.log('declarative details callback error', err);
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

interface IDVItem {
  cid: string;
  content: string;
}

/**
 * RestoreCredentialLoop
 * Helper function that takes an array of DataVault Credential Objects and adds them one at a time to the reducer.
 * @param jwtResponseArray Array of DataVault Items
 * @param finalCallback Callback function to be called at the end.
 */
const restoredCredentialLoop = (
  jwtResponseArray: IDVItem[],
  finalCallback: (err?: Error) => void,
) => (dispatch: Dispatch<any>) => {
  const receiveCredentialRif = receiveCredentialFactory(agent);
  const callback = (err: Error | undefined) => {
    if (err) {
      return finalCallback(err);
    }

    // run it again if there are more credentials:
    jwtResponseArray.length !== 1
      ? dispatch(restoredCredentialLoop(jwtResponseArray.slice(1), finalCallback))
      : finalCallback();
  };

  dispatch(receiveCredentialRif(JSON.parse(jwtResponseArray[0].content), callback));
};

/**
 * Get Credentials from the DataVault
 */
export const restoreCredentialsFromDataVault = () => async (dispatch: Dispatch<any>) => {
  getFromDataVault(dataVaultKeys.CREDENTIALS).then(credentials => {
    const callback = (err?: Error | undefined) => {
      if (err) {
        dispatch(resetRestoreProcess());
        return dispatch(errorRestore('Error Restoring Credentials'));
      }

      dispatch(receiveRestore());
      RootNavigation.navigate('SignupFlow', { screen: 'PinCreate' });
    };

    credentials.length === 0 ? callback() : dispatch(restoredCredentialLoop(credentials, callback));
  });
};
