import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RestoreWalletComponent from './RestoreWalletComponent';
import * as RootNavigation from '../../AppNavigation';
import { restoreWalletFromUserSeed } from './operations';
import { RootState } from 'src/state/store';

const mapStateToProps = (state: RootState) => ({
  isRestoring: state.restore.isRestoring,
  mnemonicError: state.restore.mnemonicError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (seed: string) => {
    dispatch(restoreWalletFromUserSeed(seed)).then(() => {
      RootNavigation.navigate('SignupFlow', { screen: 'PinCreate' });
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RestoreWalletComponent);
