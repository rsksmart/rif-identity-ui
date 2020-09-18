import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DetailsComponent } from '../components';
import { RootState } from '../../../state/store';
import { Credential } from '../reducer';
import { removeCredential, createPresentation, checkStatusOfCredential } from '../operations';
import { selectServiceTokenByIdentity } from 'je-id-core/lib/reducers/authentication';

const mapStateToProps = (state: RootState) => ({
  allCredentials: state.credentials.credentials,
  conveyServiceToken: selectServiceTokenByIdentity(
    state.authentication, state.identity.identities[0], state.settings.endpoints.conveyDid
  )
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeCredential: (hash: string) => dispatch(removeCredential(hash)),
  createPresentation: (credential: Credential, token: string) => dispatch(createPresentation(credential.jwt, token)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  credential: stateProps.allCredentials.filter(
    (item: Credential) => item.hash === ownProps.route.params.credentialHash,
  )[0],
  createPresentation: (hash: string) =>
    dispatchProps.createPresentation(
      stateProps.allCredentials.filter((item: Credential) => item.hash === hash)[0],
      stateProps.conveyServiceToken,
    ),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DetailsComponent);
