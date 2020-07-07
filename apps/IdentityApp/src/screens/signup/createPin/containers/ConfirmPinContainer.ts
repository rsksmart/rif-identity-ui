import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import ConfirmPinComponent from '../components/ConfirmPinComponent';
import {RootState} from '../../../../state/store';
import {setPinError} from '../../../../state/localUi/actions';

const mapStateToProps = (state: RootState) => ({
  tempPin: state.localUi.tempPin,
  errorMessage: state.localUi.setPinError,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (
    navigation: NavigationScreenProp<any, any>,
    result: number,
    expected: number,
  ) => {
    if (result === expected) {
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
  onSubmit: (pin: number) =>
    dispatchProps.onSubmit(ownProps.navigation, pin, stateProps.tempPin),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ConfirmPinComponent);
