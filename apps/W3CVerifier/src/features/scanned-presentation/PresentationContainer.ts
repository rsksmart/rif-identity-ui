import { connect } from 'react-redux';

import PresentationContainer from './PresentationComponent';
import { RootState } from '../../state/store';

const mapStateToProps = (state: RootState) => ({
  presentation: state.scannedPresentation.presentation,
  isVerifying: state.scannedPresentation.isVerifying
});

export default connect(mapStateToProps)(PresentationContainer);