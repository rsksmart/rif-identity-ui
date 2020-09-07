import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SummaryComponent } from '../components';
import { RootState } from '../../../state/store';
import { Credential, CredentialStatus } from '../reducer';
import { checkStatusOfCredentials, createPresentation } from '../operations';

const simpleCredentials = (credentials: Credential[]) => {
  if (!credentials) {
    return [];
  }
  return credentials.map((item: Credential) => {
    const { hash, status, type } = item;
    return { hash, status, type };
  });
};

const hasPending = (credentials: Credential[] | null) => {
  return !credentials
    ? false
    : credentials.filter((item: Credential) => item.status === 'PENDING').length !== 0;
};

const mapStateToProps = (state: RootState) => ({
  credentials: simpleCredentials(state.credentials.credentials),
  fullCredentials: state.credentials.credentials,
  isCheckingPendingStatus: state.credentials.isCheckingPendingStatus,
  did: state.identity.identities[0],
  hasMnemonic: state.identity.identities.length !== 0,
  hasPending: hasPending(state.credentials.credentials),
  isRestoring: state.restore.isRestoring,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkPending: (credentials: Credential[], did: string) =>
    dispatch(checkStatusOfCredentials(credentials, did, CredentialStatus.PENDING)),
  createPresentation: (credential: Credential) => dispatch(createPresentation(credential.jwt)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  checkPending: () => dispatchProps.checkPending(stateProps.fullCredentials, stateProps.did),
  createPresentation: (hash: string) =>
    dispatchProps.createPresentation(
      stateProps.fullCredentials.filter((item: Credential) => item.hash === hash)[0],
    ),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SummaryComponent);
