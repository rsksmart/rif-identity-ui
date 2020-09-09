import { Dispatch } from 'redux';

import { createIdentityFactory } from 'jesse-rif-id-core/lib/operations/identity';
import { agent, rifIdentityProvider } from '../../daf/dafSetup';
import { AbstractIdentity } from 'daf-core';

/**
 * Creates Identity
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
