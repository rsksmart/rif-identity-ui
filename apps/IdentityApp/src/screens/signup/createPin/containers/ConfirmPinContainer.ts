import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import ConfirmPinComponent from '../components/ConfirmPinComponent';
import {RootState} from '../../../../state/store';
import {setPinError} from '../../actions';

const mapStateToProps = (state: RootState) => ({
  pin: state.signup.pin,
  errorMessage: state.signup.pinError,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (
    navigation: NavigationScreenProp<any, any>,
    userPin: string,
    expectedPin: string,
  ) => {
    if (userPin === expectedPin) {
      dispatch(setPinError(false));
      navigation.navigate('CredentialsHome');
    } else {
      dispatch(setPinError('PIN did not match'));
    }
  },
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
