import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import { Dispatch } from 'redux';
import SigninWithPinComponent from '../components/SigninWithPinComponent';
import {checkPinAndSignIn} from '../operations';
import {RootState} from '../../../state/store';

const mapStateToProps = (state: RootState) => ({
  errorMessage: state.localUi.loginError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (navigation: NavigationScreenProp<any, any>, userPin: string) => 
    dispatch(checkPinAndSignIn(navigation, userPin)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSubmit: (userPin: string) => dispatchProps.onSubmit(ownProps.navigation, userPin),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(SigninWithPinComponent);
