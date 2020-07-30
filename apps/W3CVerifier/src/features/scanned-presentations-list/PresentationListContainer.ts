import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import { showPresentation } from '../operations'
import { Dispatch } from 'react';
import { VerifiedPresentation } from '../../api';
import PresentationListComponent from './PresentationListComponent';
import * as RootNavigation from '../../AppNavigation';

const mapStateToProps = (state: RootState) => ({
  presentations: state.presentationList.presentations,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleShowPresentation: (
    presentation: VerifiedPresentation, navigation: any
  ) => dispatch(showPresentation(presentation, navigation))
})

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleShowPresentation: (presentation: VerifiedPresentation) =>
    dispatchProps.handleShowPresentation(presentation, RootNavigation),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps,
)(PresentationListComponent);