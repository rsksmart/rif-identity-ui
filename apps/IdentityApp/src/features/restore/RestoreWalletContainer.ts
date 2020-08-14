import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RestoreWalletComponent from './RestoreWalletComponent';
import { restoreWalletFromUserSeed } from './operations';
import { RootState } from 'src/state/store';

const mapStateToProps = (state: RootState) => ({
  isRestoring: state.restore.isRestoring,
  isGettingDataVault: state.restore.isGettingDataVault,
  isGettingIpfs: state.restore.isGettingIpfs,
  mnemonicError: state.restore.mnemonicError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (seed: string) => {
    dispatch(restoreWalletFromUserSeed(seed));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RestoreWalletComponent);
