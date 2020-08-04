import { connect } from 'react-redux';
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

const mapDispatchToProps = (dispatch: any): dispatchInterface => ({
  start: () => {
    dispatch(clearError());
  },
  onSubmit: (userInput: string[], expectedInput: string[]) => {
    if (userInput.every((val, index) => val === expectedInput[index])) {
      dispatch(clearError());
      dispatch(saveMnemonicToLocalStorage(userInput));
    } else {
      dispatch(newMnemonicError('Word order is not correct :('));
    }
  },
});

const mergeProps = (
  stateProps: statePropsInterface,
  dispatchProps: dispatchInterface,
) => ({
  ...stateProps,
  ...dispatchProps,
  onSubmit: (userInput: string[]) =>
    dispatchProps.onSubmit(userInput, stateProps.mnemonic),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ConfirmMnemonicComponent);
