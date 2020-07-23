import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ScanQRComponent from './ScanQRComponent';
import { RootState } from '../../state/store';
import { scanQR } from './operations';

const mapStateToProps = (state: RootState) => ({
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleScan: (jwt: string, navigation: any) => dispatch(scanQR(jwt, navigation)), // TODO: Improve navigation stuff
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ScanQRComponent);