import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ConfirmComponent from '../components/ConfirmComponent';
import { RootState } from '../../../state/store';
import requirements from '../demoRequirements';
import { sendRequestToServer } from '../../credentialsView/operations';

const mapStateToProps = (state: RootState) => ({
  credentials: state.credentials.credentials,
  requirements: requirements,
  profile: state.profile.profile,
  did: state.localUi.did,
  isRequestingCredential: state.credentials.isRequestingCredential,
  requestCredentialError: state.credentials.requestCredentialError,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestCredential: metaData => dispatch(sendRequestToServer(metaData)),
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
