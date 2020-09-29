import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { SummaryComponent } from '../components';
import { RootState } from '../../../state/store';
import conveyConnect from './ConveyConnect';
import { checkStatusOfRequestedCredentials } from '../operations';
import { IssuedCredentialRequest } from '@rsksmart/rif-id-core/lib/reducers/issuedCredentialRequests';

const mapStateToProps = (state: RootState) => ({
  issuedCredentials: state.issuedCredentials,
  requestedCredentials: state.requestedCredentials,
  did: state.identity.identities[0] || '',
  authentication: state.authentication,
  hasMnemonic: state.identity.identities.length !== 0,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  checkPending: (
    did: string,
    requestedCredentials: IssuedCredentialRequest[],
    serviceToken: string | undefined,
  ) => dispatch(checkStatusOfRequestedCredentials(did, requestedCredentials, serviceToken)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  checkPending: () =>
    dispatchProps.checkPending(
      stateProps.did,
      stateProps.requestedCredentials[stateProps.did] || [],
      stateProps.authentication[stateProps.did] || undefined,
    ),
  issuedCredentials: stateProps.issuedCredentials[stateProps.did] || [],
  requestedCredentials: stateProps.requestedCredentials[stateProps.did] || [],
});

export default conveyConnect(connect(mapStateToProps, mapDispatchToProps, mergeProps)(SummaryComponent));
