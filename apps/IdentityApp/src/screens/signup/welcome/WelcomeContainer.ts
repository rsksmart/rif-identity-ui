import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import {RootState} from '../../../state/store';
import WelcomeComponent from './WelcomeComponent';

interface dispatchInterface {
  handlePress: (navigation: any, path: string) => any;
}

interface ownPropsInterface {
  navigation: NavigationScreenProp<any, any>;
}

const mapDispatchToProps = (dispatch: any): dispatchInterface => ({
  handlePress: (navigation: NavigationScreenProp<any, any>, path: string) =>
    navigation.navigate(path),
});

const mergeProps = (
  stateProps: RootState,
  dispatchProps: dispatchInterface,
  ownProps: ownPropsInterface
) => ({
  ...stateProps,
  ...dispatchProps,
  restoreButtonPress: () =>
    dispatchProps.handlePress(ownProps.navigation, 'RestoreWallet'),
  getStartedPress: () =>
    dispatchProps.handlePress(ownProps.navigation, 'MnemonicView'),
});

export default connect(null, mapDispatchToProps, mergeProps)(WelcomeComponent);
