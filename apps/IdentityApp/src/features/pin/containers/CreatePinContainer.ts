import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import CreatePinComponent from '../components/CreatePinComponent';
import { RootState } from '../../../state/store';
import { setPin, pinError } from '../actions';
import * as RootNavigation from '../../../AppNavigation';

const mapStateToProps = (state: RootState) => ({
  errorMessage: state.pin.pinError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (pin: number) => {
    if (pin.toString().length < 4) {
      dispatch(pinError('Your pin should be at least 4 characters.'));
    } else {
      dispatch(pinError(false));
      dispatch(setPin(pin));
      RootNavigation.navigate('SignupFlow', { screen: 'PinConfirm' });
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CreatePinComponent);
