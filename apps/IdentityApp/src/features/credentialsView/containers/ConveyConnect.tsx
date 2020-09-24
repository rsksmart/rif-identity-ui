import { selectServiceTokenByIdentity } from 'je-id-core/lib/reducers/authentication';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../../state/store';
import { createPresentation } from '../operations';
import { Credential } from '../reducer';

const mapConveyStateToConveyProps = (state:RootState ) => ({
  fullCredentials: state.credentials.credentials,
  conveyServiceToken: selectServiceTokenByIdentity(
    state.authentication, state.identity.identities[0], state.settings.endpoints.conveyDid
  )
})

const mapDispatchToConveyProps = (dispatch: Dispatch) => ({
  createPresentation: (credential: Credential, token: string) => dispatch(createPresentation(credential.jwt, token)),
})

const mergeConveyProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  createPresentation: (hash: string) =>
    dispatchProps.createPresentation(
      stateProps.fullCredentials.filter((item: Credential) => item.hash === hash)[0],
      stateProps.conveyServiceToken,
    ),
})

export default connect(mapConveyStateToConveyProps, mapDispatchToConveyProps, mergeConveyProps)