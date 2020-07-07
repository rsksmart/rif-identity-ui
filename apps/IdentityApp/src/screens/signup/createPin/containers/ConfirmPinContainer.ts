import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import ConfirmPinComponent from '../components/ConfirmPinComponent';
import {RootState} from '../../../../state/store';
import {checkPinMatchAndSet} from '../../operations';

const mapStateToProps = (state: RootState) => ({
  pin: state.signup.pin,
  errorMessage: state.signup.pinError,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (
    navigation: NavigationScreenProp<any, any>,
    userPin: string,
    expectedPin: string,
  ) => dispatch(checkPinMatchAndSet(navigation, userPin, expectedPin)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSubmit: (userPin: string) =>
    dispatchProps.onSubmit(ownProps.navigation, userPin, stateProps.pin),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ConfirmPinComponent);
