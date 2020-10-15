import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ScanQRComponent from './ScanQRComponent';
import { RootState } from '../../state/store';
import { scanQR } from '../../features/operations';
import { VerifiedPresentation } from '../../api';
import { selectServiceTokenByIdentity } from '@rsksmart/rif-id-core/lib/reducers/authentication'
import { CONVEY_DID } from '../../../env.json'

const mapStateToProps = (state: RootState) => ({
  scannedPresentations: state.presentationList.presentations,
  isVerifying: state.scannedPresentation.isVerifying,
  allowScanAgain: state.localUi.allowScanAgain,
  isLoggingInToConvey: state.localUi.loggingInToConvey,
  isLoggedInToConvey: state.localUi.loggedInToConvey,
  errorConveyLogin: state.localUi.errorConveyLogin,
  conveyServiceToken: selectServiceTokenByIdentity(
    state.authentication, state.identity.identities[0], CONVEY_DID
  )
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleScan: (
    data: string, scannedPresentations: VerifiedPresentation[], conveyServiceToken: string, navigation: any,
  ) => dispatch(scanQR(data, scannedPresentations, conveyServiceToken, navigation)) // TODO: Improve navigation stuff
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleScan: (data: string, navigation: any) =>
    dispatchProps.handleScan(data, stateProps.scannedPresentations, stateProps.conveyServiceToken, navigation),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(ScanQRComponent);