import { connect } from 'react-redux';
import { Dispatch } from 'react';
import ConfirmMnemonicComponent from '../components/ConfirmMnemonicComponent';
import { RootState } from '../../../state/store';
import { newMnemonicError, clearError } from '../actions';
import { saveIdentityToLocalStorage } from '../operations';
import * as RootNavigation from '../../../AppNavigation';

interface statePropsInterface {
  mnemonic: string[];
  isError: string | false;
}

interface dispatchInterface {
  start: Function;
  onSubmit: Function;
}

const mapStateToProps = (state: RootState) => ({
  mnemonic: state.identity.newMnemonic,
  isError: state.identity.mnemonicError,
  isSaving: state.identity.isSaving,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: () => {
    dispatch(clearError());
  },
  onSubmit: async (userInput: string[], expectedInput: string[]) => {
    if (userInput.every((val, index) => val === expectedInput[index])) {
      dispatch(saveIdentityToLocalStorage(userInput)).then(() => {
        RootNavigation.navigate('CredentialsFlow', { screen: 'CredentialsHome' });
      });
    } else {
      dispatch(newMnemonicError('word_order_error'));
    }
  },
});

const mergeProps = (stateProps: statePropsInterface, dispatchProps: dispatchInterface) => ({
  ...stateProps,
  ...dispatchProps,
  onSubmit: (userInput: string[]) => dispatchProps.onSubmit(userInput, stateProps.mnemonic),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ConfirmMnemonicComponent);
