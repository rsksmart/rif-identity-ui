import { connect } from 'react-redux';
import WelcomeComponent from './WelcomeComponent';
import * as RootNavigation from '../../../AppNavigation';

interface dispatchInterface {
  restoreButtonPress: (path: string) => any;
  getStartedPress: (path: string) => any;
}

const mapDispatchToProps = (): dispatchInterface => ({
  restoreButtonPress: () =>
    RootNavigation.navigate('SignupFlow', { screen: 'RestoreWallet' }),
  getStartedPress: () =>
    RootNavigation.navigate('SignupFlow', { screen: 'PinCreate' }),
});

export default connect(null, mapDispatchToProps)(WelcomeComponent);
