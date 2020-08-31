import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RestoreWalletComponent from './RestoreWalletComponent';
import { restoreWalletFromUserSeed } from './operations';
import { RootState } from 'src/state/store';
import { closeErrorNoIdentity, receiveRestore } from './actions';
import * as RootNavigation from '../../AppNavigation';

const mapStateToProps = (state: RootState) => ({
  isRestoring: state.restore.isRestoring,
  isGettingDataVault: state.restore.isGettingDataVault,
  isGettingIpfs: state.restore.isGettingIpfs,
  mnemonicError: state.restore.mnemonicError,
  noIdentityError: state.restore.noIdentityError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (seed: string) => {
    dispatch(restoreWalletFromUserSeed(seed));
  },
  closeIdentityError: () => dispatch(closeErrorNoIdentity()),
  createNewItentity: () => {
    RootNavigation.navigate('SignupFlow', { screen: 'PinCreate' });
    dispatch(receiveRestore());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RestoreWalletComponent);
