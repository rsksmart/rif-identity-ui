import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import RestoreWalletComponent from './RestoreWalletComponent';
import * as RootNavigation from '../../AppNavigation';
import { restoreWalletFromUserSeed } from '../identity/operations';
import { RootState } from 'src/state/store';

const mapStateToProps = (state: RootState) => ({
  mnemonicError: state.identity.mnemonicError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: async (seed: string) => {
    if (await dispatch(restoreWalletFromUserSeed(seed))) {
      RootNavigation.navigate('SignupFlow', { screen: 'PinCreate' });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RestoreWalletComponent);
