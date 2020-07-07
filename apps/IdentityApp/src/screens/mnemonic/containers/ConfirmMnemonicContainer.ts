import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import ConfirmMnemonicComponent from '../components/ConfirmMnemonicComponent';
import {RootState} from '../../../state/store';
import {newMnemonicError, clearMnemonicError} from '../../../state/localUi/actions';

interface statePropsInterface {
  words: string[],
  isError: string | false,
}

interface dispatchInterface {
  start: Function,
  onSubmit: Function,
}

interface ownPropsInterface {
  navigation: NavigationScreenProp<any, any>;
}

const mapStateToProps = (state: RootState) => ({
  words: state.localUi.sampleMnemonic,
  isError: state.localUi.mnemonicError,
});

const mapDispatchToProps = (dispatch: any):dispatchInterface => ({
  start: () => {
    dispatch(clearMnemonicError());
  },
  onSubmit: (words: string[], navigation: NavigationScreenProp<any, any>) => {
    // for the demo, only checking the last word
    if (words[11] !== 'nope') {
      dispatch(newMnemonicError('Word order is not correct :('));
    } else {
      dispatch(clearMnemonicError());
      navigation.navigate('PinCreate');
    }
  },
});

const mergeProps = (
  stateProps: statePropsInterface,
  dispatchProps:dispatchInterface,
  ownProps: ownPropsInterface
) => ({
  ...stateProps,
  ...dispatchProps,
  onSubmit: (words: string[]) => dispatchProps.onSubmit(words, ownProps.navigation),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ConfirmMnemonicComponent);
