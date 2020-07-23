import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import ValidPresentationContainer from '../components/ValidPresentationComponent';
import { RootState } from '../../../state/store';

const mapStateToProps = (state: RootState) => ({
  presentation: state.scannedPresentation.presentation,
  isVerifying: state.scannedPresentation.isVerifying
});

export default connect(mapStateToProps)(ValidPresentationContainer);