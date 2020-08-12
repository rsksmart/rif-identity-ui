import { Dispatch } from 'react';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';
import { receiveMnemonic, restoreSeedError, setNewMnemnoic } from './actions';
import { generateMnemonic } from 'mnemonicsss';

/**
 * Saves Mnemonic to Localstorage
 * @param mnemonic string[] Mnemonic to save as JSON
 */
export const saveMnemonicToLocalStorage = (mnemonic: string[]) => async (dispatch: Dispatch) => {
  await StorageProvider.set(STORAGE_KEYS.MNEMONIC, JSON.stringify(mnemonic))
    .then(() => {
      dispatch(receiveMnemonic(true, mnemonic));
      return true;
    })
    .catch((error: any) => console.log(error));
};

/**
 * Returns mnemonic from LocalStorage if set
 */
export const getMnemonicFromLocalStorage = () => async (dispatch: Dispatch) => {
  console.log('checking storage :)');
  await StorageProvider.get(STORAGE_KEYS.MNEMONIC)
    .then(response => {
      if (typeof response === 'string') {
        const mnemonic = JSON.parse(response);
        return dispatch(receiveMnemonic(true, mnemonic));
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
    await dispatch(saveMnemonicToLocalStorage(seedArray));
    return true;
  }

  dispatch(restoreSeedError('short_seed_error'));
  return false;
};

export const generateNewMnemonic = () => async (dispatch: Dispatch) => {
  const mnemonic = generateMnemonic(12);
  dispatch(setNewMnemnoic(mnemonic.split(' ')));
};
