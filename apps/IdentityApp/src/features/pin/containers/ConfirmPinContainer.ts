import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ConfirmPinComponent from '../components/ConfirmPinComponent';
import { RootState } from '../../../state/store';
import { checkPinMatchAndSet } from '../operations';

const mapStateToProps = (state: RootState) => ({
  pin: state.pin.pin,
  errorMessage: state.pin.pinError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onSubmit: (userPin: string, expectedPin: string) =>
    dispatch(checkPinMatchAndSet(userPin, expectedPin)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  onSubmit: (userPin: string) =>
    dispatchProps.onSubmit(userPin, stateProps.pin),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ConfirmPinComponent);
