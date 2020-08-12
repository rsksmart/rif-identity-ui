import { Dispatch } from 'react';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';
import { rskDIDFromPrivateKey } from 'rifdids';
import {
  receiveMnemonic,
  restoreSeedError,
  setNewMnemnoic,
  requestSaveIdentity,
  receiveSaveIdentity,
  receiveIdentity,
} from './actions';
import { generateMnemonic, mnemonicToSeed, seedToRSKHDKey } from 'mnemonicsss';

/**
 * Saves Identity to Localstorage
 * @param mnemonic string[] Mnemonic to create identity and save as JSON
 */
export const saveIdentityToLocalStorage = (mnemonic: string[]) => async (dispatch: Dispatch) => {
  return new Promise((resolve, reject) => {
    dispatch(requestSaveIdentity());

    mnemonicToSeed(mnemonic.join(' '))
      .then(seed => {
        const hdKey = seedToRSKHDKey(seed);
        const privateKey = hdKey.derive(0).privateKey?.toString('hex');
        const rskDID = rskDIDFromPrivateKey()(privateKey);

        const identity = {
          publicKey: hdKey.derive(0).publicKey?.toString('hex'),
          privateKey,
          mnemonic,
          did: rskDID.did,
          address: rskDID.address,
        };

        StorageProvider.set(STORAGE_KEYS.IDENTITY, JSON.stringify(identity)).then(() => {
          dispatch(receiveMnemonic(true, mnemonic));
          resolve(dispatch(receiveSaveIdentity(rskDID.address, rskDID.did)));
        });
      })
      .catch(error => reject(error.message));
  });
};

/**
 * Returns mnemonic from LocalStorage if set
 */
export const getMnemonicFromLocalStorage = () => async (dispatch: Dispatch) => {
  console.log('checking storage :)');
  await StorageProvider.get(STORAGE_KEYS.IDENTITY)
    .then(response => {
      if (typeof response === 'string') {
        const identity = JSON.parse(response);

        dispatch(receiveIdentity(identity.address, identity.did));
        return dispatch(receiveMnemonic(true, identity.mnemonic));
      }
      return dispatch(receiveMnemonic(false));
    })
    .catch(() => dispatch(receiveMnemonic(false)));
};

/**
 * Restores a wallet from a seed phrase
 * @param seed string Seed with spaces
 */
export const restoreWalletFromUserSeed = (seed: string) => async (dispatch: Dispatch) => {
  const seedArray = seed.split(' ');
  if (seedArray.length >= 12) {
    await dispatch(saveIdentityToLocalStorage(seedArray));
    return true;
  }

  dispatch(restoreSeedError('short_seed_error'));
  return false;
};

export const generateNewMnemonic = () => async (dispatch: Dispatch) => {
  const mnemonic = generateMnemonic(12);
  dispatch(setNewMnemnoic(mnemonic.split(' ')));
};
