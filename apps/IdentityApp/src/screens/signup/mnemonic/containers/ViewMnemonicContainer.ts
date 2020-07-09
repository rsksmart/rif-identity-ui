import { connect } from 'react-redux';
import ViewMnemonicComponent from '../components/ViewMnemonicComponent';
import { RootState } from '../../../../state/store';
import * as RootNavigation from '../../../../AppNavigation';

const mapStateToProps = (state: RootState) => ({
  mnemonic: state.signup.mnemonic,
});

const mapDispatchToProps = () => ({
  onSubmit: () =>
    RootNavigation.navigate('SignupFlow', { screen: 'MnemonicConfirm' }),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ViewMnemonicComponent);
