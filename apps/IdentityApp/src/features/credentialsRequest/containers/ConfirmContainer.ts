import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ConfirmComponent from '../components/ConfirmComponent';
import { RootState } from '../../../state/store';
import requirements from '../demoRequirements';
import { requestCredential } from '../../credentialsView/operations';

const mapStateToProps = (state: RootState) => ({
  credentials: state.credentials.credentials,
  requirements: requirements,
  profile: state.profile.profile,
  did: state.localUi.did,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestCredential: metaData => dispatch(requestCredential(metaData)),
});

/*
const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  requestCredential: (metaData: []) =>
    dispatchProps.requestCredential(metaData, stateProps.credentials),
});
*/

export default connect(mapStateToProps, mapDispatchToProps)(ConfirmComponent);
