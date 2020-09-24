import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SummaryComponent } from '../components';
import { RootState } from '../../../state/store';
import conveyConnect from './ConveyConnect'
import { checkStatusOfRequestedCredentials, createPresentation } from '../operations';
import { Credential as RifCredential } from 'jesse-rif-id-core/src/reducers/credentials';
import { IssuedCredentialRequest } from 'jesse-rif-id-core/lib/reducers/issuedCredentialRequests';

const mapStateToProps = (state: RootState) => ({
  issuedCredentials: state.issuedCredentials,
  requestedCredentials: state.requestedCredentials,
  did: state.identity.identities[0] || '',

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
      stateProps.issuedCredentials[stateProps.did].filter(
        (item: RifCredential) => item.hash === hash,
      )[0],
    ),
  issuedCredentials: stateProps.issuedCredentials[stateProps.did] || [],
  requestedCredentials: stateProps.requestedCredentials[stateProps.did] || [],
});

export default conveyConnect(connect(mapStateToProps, mapDispatchToProps, mergeProps)(SummaryComponent));
