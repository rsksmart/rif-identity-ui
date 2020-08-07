import { connect } from 'react-redux';
import { Dispatch } from 'react';
import ConfirmMnemonicComponent from '../components/ConfirmMnemonicComponent';
import { RootState } from '../../../state/store';
import { newMnemonicError, clearError } from '../actions';
import { saveMnemonicToLocalStorage } from '../operations';
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
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: () => {
    dispatch(clearError());
  },
  onSubmit: (userInput: string[], expectedInput: string[]) => {
    if (userInput.every((val, index) => val === expectedInput[index])) {
      dispatch(clearError());
      if (dispatch(saveMnemonicToLocalStorage(userInput))) {
        RootNavigation.navigate('CredentialsFlow', { screen: 'CredentialsHome' });
      }
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
