import {connect} from 'react-redux';
import {NavigationScreenProp} from 'react-navigation';
import CreatePinComponent from '../components/CreatePinComponent';
import {setPin, setPinError} from '../../../../state/localUi/actions';

const mapStateToProps = (state: RootState) => ({
  errorMessage: state.localUi.setPinError,
});

const mapDispatchToProps = (dispatch) => ({
  onSubmit: (navigation: NavigationScreenProp<any, any>, pin: number) => {
    if (pin < 1000) {
      dispatch(setPinError('Your pin should be at least 4 characters.'));
    } else {
      dispatch(setPinError(false));
      dispatch(setPin(pin));
      navigation.navigate('PinConfirm');
    }
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSubmit: (pin: number) => dispatchProps.onSubmit(ownProps.navigation, pin),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(CreatePinComponent);
