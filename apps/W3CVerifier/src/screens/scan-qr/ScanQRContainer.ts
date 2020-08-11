import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ScanQRComponent from './ScanQRComponent';
import { RootState } from '../../state/store';
import { scanQR } from '../../features/operations';
import { VerifiedPresentation } from '../../api';

const mapStateToProps = (state: RootState) => ({
  scannedPresentations: state.presentationList.presentations,
  isVerifying: state.scannedPresentation.isVerifying,
  allowScanAgain: state.localUi.allowScanAgain,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleScan: (
    data: string, scannedPresentations: VerifiedPresentation[], navigation: any,
  ) => dispatch(scanQR(data, scannedPresentations, navigation)) // TODO: Improve navigation stuff
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleScan: (data: string, navigation: any) =>
    dispatchProps.handleScan(data, stateProps.scannedPresentations, navigation),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ScanQRComponent);