import { connect } from 'react-redux';
import RestoreWalletComponent from './RestoreWalletComponent';
import * as RootNavigation from '../../../AppNavigation';

const mapDispatchToProps = () => ({
  onSubmit: () =>
    RootNavigation.navigate('SignupFlow', { screen: 'PinCreate' }),
});

export default connect(null, mapDispatchToProps)(RestoreWalletComponent);
