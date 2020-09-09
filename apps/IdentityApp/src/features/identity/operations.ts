import { Dispatch } from 'redux';

import {
  initIdentityFactory,
  createIdentityFactory,
} from 'jesse-rif-id-core/lib/operations/identity';
import { addIdentity } from 'jesse-rif-id-core/lib/reducers/identitySlice';
import { agent, rifIdentityProvider } from '../../daf/dafSetup';
import { AbstractIdentity } from 'daf-core';

/**
 * Creates Identity from identityFactory
 * @param mnemonic string[] Mnemonic to create identity and save as JSON
 * @param callback function(err, res) Optional function to be called
 */
export const createRifIdentity = (
  mnemonic: string[],
  callback?: (_err: any, res: AbstractIdentity) => null,
) => (dispatch: Dispatch) => {
  const createIdentity = createIdentityFactory(agent);
  rifIdentityProvider
    .importMnemonic(mnemonic.join(' '))
    .then(() => dispatch(createIdentity(callback)));
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
