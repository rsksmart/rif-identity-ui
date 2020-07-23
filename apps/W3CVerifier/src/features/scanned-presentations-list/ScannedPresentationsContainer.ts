import { connect } from 'react-redux';

import ScannedPresentationsComponent from './ScannedPresentationsComponent';
import { RootState } from '../../state/store';

const mapStateToProps = (state: RootState) => ({
  presentations: state.presentationList.presentations,
  emptyHistory: state.presentationList.presentations.length === 0
})

export default connect(mapStateToProps)(ScannedPresentationsComponent);