import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SummaryComponent } from '../components';
import { RootState } from '../../../state/store';
import { Credential, CredentialStatus } from '../reducer';
import conveyConnect from './ConveyConnect'
import { checkStatusOfRequestedCredentials, createPresentation } from '../operations';
import { Credential as RifCredential } from 'jesse-rif-id-core/src/reducers/credentials';
import { IssuedCredentialRequest } from 'jesse-rif-id-core/lib/reducers/issuedCredentialRequests';

const simpleCredentials = (credentials: Credential[]) => {
  if (!credentials) {
    return [];
  }
  return credentials.map((item: Credential) => {
    const { hash, status, type } = item;
    return { hash, status, type };
  });
};

const mapStateToProps = (state: RootState) => ({
  credentials: simpleCredentials(state.credentials.credentials),
  issuedCredentials: state.issuedCredentials,
  requestedCredentials: state.requestedCredentials,
  did: state.identity.identities[0] || '',

  fullCredentials: state.credentials.credentials,
  isCheckingPendingStatus: state.credentials.isCheckingPendingStatus,
  hasMnemonic: state.identity.identities.length !== 0,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  checkPending: (did: string, requestedCredentials: IssuedCredentialRequest[]) =>
    dispatch(checkStatusOfRequestedCredentials(did, requestedCredentials)),
  createPresentation: (credential: RifCredential) => dispatch(createPresentation(credential.raw)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  checkPending: () =>
    dispatchProps.checkPending(
      stateProps.did,
      stateProps.requestedCredentials[stateProps.did] || [],
    ),
  createPresentation: (hash: string) =>
    dispatchProps.createPresentation(
      stateProps.fullCredentials.filter((item: Credential) => item.hash === hash)[0],
    ),
  issuedCredentials: stateProps.issuedCredentials[stateProps.did] || [],
  requestedCredentials: stateProps.requestedCredentials[stateProps.did] || [],
});

export default conveyConnect(connect(mapStateToProps, mapDispatchToProps, mergeProps)(SummaryComponent));
