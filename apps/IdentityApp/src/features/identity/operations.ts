import { Dispatch } from 'redux';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';

import {
  initIdentityFactory,
  createIdentityFactory,
} from 'jesse-rif-id-core/lib/operations/identity';
import { addIdentity } from 'jesse-rif-id-core/lib/reducers/identitySlice';
import { agent, rifIdentityProvider } from '../../daf/dafSetup';

/**
 * Creates Identity from identityFactory, then saves the DID and Mnemonic to
 * local storage so the user can backup.
 * @param mnemonic string[] Mnemonic to create identity and save as JSON
 */
export const createIdentitySaveMnemonic = (mnemonic: string[]) => async (dispatch: Dispatch) => {
  return new Promise(async resolve => {
    const initIdentity = initIdentityFactory(agent);
    const createIdentity = createIdentityFactory(agent);

    await rifIdentityProvider.importMnemonic(mnemonic.join(' '));

    await initIdentity()(dispatch);

    // store the mnemonic into localStorage
    const callBack = () =>
      StorageProvider.set(STORAGE_KEYS.IDENTITY, JSON.stringify({ mnemonic })).then(() => {
        resolve(true);
      });

    // creates the identity and then adds it to redux:
    await createIdentity(callBack)(dispatch);
  });
};

/**
 * Gets identity from the agent identityManager and places it into redux
 * if it exists.
 */
export const getIdentity = () => async (dispatch: Dispatch) => {
  initIdentityFactory(agent);
  const identities = await agent.identityManager.getIdentities();
  if (identities.length !== 0) {
    dispatch(addIdentity({ did: identities[0].did }));
  }
};
