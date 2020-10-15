import { connect } from 'react-redux';
import ScannedPresentationsComponent from './ScannedPresentationsComponent';
import { RootState } from '../../state/store';
import { cleanStorage } from '../operations'
import { Dispatch } from 'react';

const mapStateToProps = (state: RootState) => ({
  presentations: state.presentationList.presentations,
  emptyHistory: state.presentationList.presentations.length === 0
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  cleanStorage: () => dispatch(cleanStorage()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ScannedPresentationsComponent);