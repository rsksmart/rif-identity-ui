import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ConfirmMnemonicComponent from '../components/ConfirmMnemonicComponent';
import { createRifIdentity } from '../operations';
import * as RootNavigation from '../../../AppNavigation';
import { AbstractIdentity } from 'daf-core';

interface dispatchInterface {
  onSubmit: Function;
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (mnemonic: string[]) => {
    const callback = (_err: any, res: AbstractIdentity) =>
      res && RootNavigation.navigate('CredentialsFlow', { screen: 'CredentialsHome' });
    dispatch(createRifIdentity(mnemonic, callback));
  },
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
