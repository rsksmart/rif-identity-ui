import { Dispatch } from 'redux';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';
import { receiveMnemonic } from './actions';
import * as RootNavigation from '../../AppNavigation';

export const saveMnemonicToLocalStorage = (mnemonic: string[]) => async (dispatch: Dispatch) => {
  console.log('saving mnemonic!', mnemonic);

  await StorageProvider.set(STORAGE_KEYS.MNEMONIC, JSON.stringify(mnemonic))
    .then(() => {
      console.log('saved!');
      dispatch(receiveMnemonic(true, mnemonic));
      RootNavigation.navigate('CredentialsFlow', { screen: 'CredentialsHome' });
    })
    .catch((error:any) => console.log(error));
}

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
}
