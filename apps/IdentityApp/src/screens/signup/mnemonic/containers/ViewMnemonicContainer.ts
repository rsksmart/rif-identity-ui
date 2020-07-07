import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import ViewMnemonicComponent from '../components/ViewMnemonicComponent';
import { RootState } from '../../../state/store';


interface statePropsInterface {
  words: string[];
}

interface dispatchPropsInterface {
  onSubmit: Function;
}

interface ownPropsInterface {
  navigation: NavigationScreenProp<any, any>;
}

const mapStateToProps = (state: RootState) => ({
  words: state.localUi.sampleMnemonic,
});

const mapDispatchToProps = () => ({
  onSubmit: (navigation: NavigationScreenProp<any, any>) =>
    navigation.navigate('MnemonicConfirm'),
});

const mergeProps = (
  stateProps: statePropsInterface,
  dispatchProps: dispatchPropsInterface,
  ownProps: ownPropsInterface,
) => ({
  ...stateProps,
  ...dispatchProps,
  onSubmit: () => dispatchProps.onSubmit(ownProps.navigation),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ViewMnemonicComponent);
