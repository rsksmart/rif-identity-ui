import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import { Dispatch } from 'redux';

import CredentialsHomeComponent from '../components/CredentialsHomeComponent';
import {RootState} from '../../../state/store';
import {signOutAndReset} from '../operations';

const mapStateToProps = (state: RootState) => ({
  state,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (navigation: NavigationScreenProp<any, any>) => dispatch(signOutAndReset(navigation)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  startOverPress: () => dispatchProps.onSubmit(ownProps.navigation),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CredentialsHomeComponent);
