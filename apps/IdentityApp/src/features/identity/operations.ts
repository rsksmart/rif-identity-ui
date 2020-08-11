import { Dispatch } from 'redux';
import { entropyToMnemonic, setDefaultWordlist } from 'bip39';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';
import { receiveMnemonic, restoreSeedError, setNewMnemnoic } from './actions';
import { randomBytes } from 'react-native-randombytes';

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

const getRandom = (count: number) =>
  new Promise((resolve, reject) => {
    return randomBytes(count, (err: any, bytes: any) => (err ? reject(err) : resolve(bytes)));
  });

/**
 * Generate New Mnemonic
 * @param language string Language code from multilanguage reducer
 */
export const generateNewMnemonic = (language: string) => async (dispatch: Dispatch) => {
  setDefaultWordlist(language === 'en' ? 'english' : 'spanish');
  const entropy = await getRandom(16);
  const mnemonic = entropyToMnemonic(entropy);
  dispatch(setNewMnemnoic(mnemonic.split(' ')));
};
