import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SummaryComponent } from '../components';
import { RootState } from '../../../state/store';
import { Credential, CredentialStatus } from '../reducer';
import { checkStatusOfCredentials, createPresentation } from '../operations';

const simpleCredentials = (credentials: Credential[]) => {
  return credentials.map((item: Credential) => {
    const { hash, status, type } = item;
    return { hash, status, type };
  });
};

const mapStateToProps = (state: RootState) => ({
  credentials: simpleCredentials(state.credentials.credentials),
  fullCredentials: state.credentials.credentials,
  isCheckingPendingStatus: state.credentials.isCheckingPendingStatus,
  did: state.localUi.did,
  address: state.localUi.address,
  privateKey: state.localUi.privateKey,
  hasMnemonic: state.identity.hasMnemonic,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  checkPending: (credentials: Credential[], did: string) =>
    dispatch(checkStatusOfCredentials(credentials, did, CredentialStatus.PENDING)),
  createPresentation: (credential: Credential, address: string, privateKey: string) =>
    dispatch(createPresentation(credential.jwt, address, privateKey)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  checkPending: () => dispatchProps.checkPending(stateProps.fullCredentials, stateProps.did),
  createPresentation: (hash: string) =>
    dispatchProps.createPresentation(
      stateProps.fullCredentials.filter((item: Credential) => item.hash === hash)[0],
      stateProps.address,
      stateProps.privateKey,
    ),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SummaryComponent);
