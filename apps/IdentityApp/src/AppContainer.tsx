import {connect} from 'react-redux';
import {RootState} from './state/store';
import AppNavigation from './AppNavigation';

const mapStateToProps = (state: RootState) => ({
  checkingSingedUp: state.localUi.checkingSingedUp,
  isSignedUp: state.localUi.isSignedUp,
});

export default connect(mapStateToProps)(AppNavigation);
