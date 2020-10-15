import { connect } from 'react-redux';

import PresentationContainer from './PresentationComponent';
import { RootState } from '../../state/store';
import { goToScanner } from '../operations'

const mapStateToProps = (state: RootState) => ({
  presentation: state.scannedPresentation.presentation,
  isVerifying: state.scannedPresentation.isVerifying
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleGoToScanner: () => dispatch(goToScanner())
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PresentationContainer);