import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import ConfirmMnemonicComponent from '../components/ConfirmMnemonicComponent';
import {RootState} from '../../../../state/store';
import {newMnemonicError, clearError} from '../../actions';

interface statePropsInterface {
  mnemonic: string[];
  isError: string | false;
}

interface dispatchInterface {
  start: Function;
  onSubmit: Function;
}

interface ownPropsInterface {
  navigation: NavigationScreenProp<any, any>;
}

const mapStateToProps = (state: RootState) => ({
  mnemonic: state.signup.mnemonic,
  isError: state.signup.mnemonicError,
});

const mapDispatchToProps = (dispatch: any): dispatchInterface => ({
  start: () => {
    dispatch(clearError());
  },
  onSubmit: (
    userInput: string[],
    expectedInput: string[],
    navigation: NavigationScreenProp<any, any>,
  ) => {
    // does each word in array match expected input?
    if (userInput.every((val, index) => val === expectedInput[index])) {
      dispatch(clearError());
      navigation.navigate('PinCreate');
    } else {
      dispatch(newMnemonicError('Word order is not correct :('));
    }
  },
});

const mergeProps = (
  stateProps: statePropsInterface,
  dispatchProps: dispatchInterface,
  ownProps: ownPropsInterface,
) => ({
  ...stateProps,
  ...dispatchProps,
  onSubmit: (userInput: string[]) =>
    dispatchProps.onSubmit(userInput, stateProps.mnemonic, ownProps.navigation),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ConfirmMnemonicComponent);
