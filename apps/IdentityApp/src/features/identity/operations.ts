import { Dispatch } from 'redux';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';
import {
  receiveMnemonic,
  setNewMnemnoic,
  requestSaveIdentity,
  receiveSaveIdentity,
  receiveIdentity,
} from './actions';
import { generateMnemonic } from '@rsksmart/rif-id-mnemonic';
import { rifIdentityProvider } from '../../daf/dafSetup';

/**
 * Creates Identity from DAF
 * @param mnemonic string[] Mnemonic to create identity and save as JSON
 */
export const saveIdentityToLocalStorage = (mnemonic: string[]) => async (dispatch: Dispatch) => {
  return new Promise(async resolve => {
    dispatch(requestSaveIdentity());

    await rifIdentityProvider.importMnemonic(mnemonic.join(' '));
    const identity = await rifIdentityProvider.createIdentity();

    const jsonIdentity = {
      mnemonic,
      did: identity.did,
    };

    StorageProvider.set(STORAGE_KEYS.IDENTITY, JSON.stringify(jsonIdentity)).then(() => {
      dispatch(receiveMnemonic(mnemonic));
      dispatch(receiveSaveIdentity(identity.identityController.address, identity.did));
      resolve(dispatch(receiveSaveIdentity(identity.identityController.address, identity.did)));
    });
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
        return dispatch(receiveMnemonic(identity.mnemonic));
      }
      return dispatch(receiveMnemonic(null));
    })
    .catch(() => dispatch(receiveMnemonic(null)));
};

export const generateNewMnemonic = () => async (dispatch: Dispatch) => {
  const mnemonic = generateMnemonic(12);
  dispatch(setNewMnemnoic(mnemonic.split(' ')));
};
