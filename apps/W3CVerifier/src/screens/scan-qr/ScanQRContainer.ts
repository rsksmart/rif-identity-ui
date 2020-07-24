import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ScanQRComponent from './ScanQRComponent';
import { RootState } from '../../state/store';
import { scanQR } from '../../features/scanned-presentation/operations';
import { VerifiedPresentation } from '../../api';

const mapStateToProps = (state: RootState) => ({
  scannedPresentations: state.presentationList.presentations
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleScan: (
    jwt: string, scannedPresentations: VerifiedPresentation[], navigation: any,
  ) => dispatch(scanQR(jwt, scannedPresentations, navigation)) // TODO: Improve navigation stuff
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleScan: (jwt: string, navigation: any) =>
    dispatchProps.handleScan(jwt, stateProps.scannedPresentations, navigation),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ScanQRComponent);