import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ConfirmMnemonicComponent from '../components/ConfirmMnemonicComponent';
import { saveIdentityToLocalStorage } from '../operations';
import * as RootNavigation from '../../../AppNavigation';

interface dispatchInterface {
  onSubmit: Function;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (mnemonic: string[]) =>
    dispatch(saveIdentityToLocalStorage(mnemonic)).then(() => {
      RootNavigation.navigate('CredentialsFlow', { screen: 'CredentialsHome' });
    }),
});

const mergeProps = (
  _stateProps: [],
  dispatchProps: dispatchInterface,
  ownProps: { route: { params: { mnemonic: string[] } } },
) => ({
  ...dispatchProps,
  ...ownProps,
  onSubmit: () => dispatchProps.onSubmit(ownProps.route.params.mnemonic),
  mnemonic: ownProps.route.params.mnemonic,
});

export default connect(null, mapDispatchToProps, mergeProps)(ConfirmMnemonicComponent);
