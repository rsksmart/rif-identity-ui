import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RestoreWalletComponent from './RestoreWalletComponent';
import { restoreWalletFromUserSeed } from './operations';
import { RootState } from 'src/state/store';
import { closeErrorNoIdentity, requestRestore, receiveRestore } from './actions';
import * as RootNavigation from '../../AppNavigation';
import { deleteAllIdentities } from 'jesse-rif-id-core/lib/reducers/identitySlice';
import { createRifIdentity } from '../identity/operations';

const mapStateToProps = (state: RootState) => ({
  isRestoring: state.restore.isRestoring,
  restoreError: state.restore.restoreError,
  noIdentityError: state.restore.noIdentityError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (mnemonic: string[]) => {
    dispatch(restoreWalletFromUserSeed(mnemonic));
  },
  closeIdentityError: () => {
    dispatch(deleteAllIdentities());
    dispatch(closeErrorNoIdentity());
  },
  createNewItentity: (mnemonic: string[]) => {
    dispatch(requestRestore());
    const callback = (err: Error) => {
      if (err) {
        throw err;
      }
      RootNavigation.navigate('SignupFlow', { screen: 'PinCreate' });
      dispatch(receiveRestore());
    };
    console.log('creating identity', mnemonic);
    dispatch(createRifIdentity(mnemonic, callback));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RestoreWalletComponent);
