import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SummaryComponent } from '../components';
import { RootState } from '../../../state/store';
import { Credential, CredentialStatus } from '../reducer';
import { checkStatusOfCredentials, createPresentation } from '../operations';
import conveyConnect from './ConveyConnect'
import { Credential as RifCredential } from 'jesse-rif-id-core/src/reducers/credentials';

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
  issuedCredentials: state.issuedCredentials,
  requestedCredentials: state.requestedCredentials,

  fullCredentials: state.credentials.credentials,
  isCheckingPendingStatus: state.credentials.isCheckingPendingStatus,
  did: state.identity.identities[0],
  hasMnemonic: state.identity.identities.length !== 0,
  hasPending: hasPending(state.credentials.credentials),
  isRestoring: state.restore.isRestoring,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  checkPending: (credentials: Credential[], did: string) =>
    dispatch(checkStatusOfCredentials(credentials, did, CredentialStatus.PENDING)),
  createPresentation: (credential: RifCredential) => dispatch(createPresentation(credential.raw)),
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
  issuedCredentials: () => {
    return stateProps.issuedCredentials[stateProps.did] || [];
  },
});

export default conveyConnect(connect(mapStateToProps, mapDispatchToProps, mergeProps)(SummaryComponent));
