import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ConfirmComponent from '../components/ConfirmComponent';
import { RootState } from '../../../state/store';
import requirements from '../demoRequirements';
import { Credential } from '../../credentialsView/reducer';
import { requestCredential } from '../../credentialsView/operations';

const mapStateToProps = (state: RootState) => ({
  credentials: state.credentials.credentials,
  requirements: requirements,
  profile: state.profile.profile,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  requestCredential: (credential: Credential, credentialList: Credential[]) =>
    dispatch(requestCredential(credential, credentialList)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  requestCredential: (credential: Credential) =>
    dispatchProps.requestCredential(credential, stateProps.credentials),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ConfirmComponent);
