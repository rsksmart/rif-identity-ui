import { selectServiceTokenByIdentity } from '@rsksmart/rif-id-core/lib/reducers/authentication';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '../../../state/store';
import { createPresentation } from '../operations';
import { Credential } from '@rsksmart/rif-id-core/src/reducers/credentials';

const mapStateToProps = (state: RootState) => ({
  did: state.identity.identities[0] || '',
  issuedCredentials: state.issuedCredentials,
  conveyServiceToken: selectServiceTokenByIdentity(
    state.authentication,
    state.identity.identities[0],
    state.settings.endpoints.conveyDid,
  ),
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  createPresentation: (credential: Credential, token: string) =>
    dispatch(createPresentation(credential.raw, token)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  createPresentation: (hash: string) =>
    dispatchProps.createPresentation(
      stateProps.issuedCredentials[stateProps.did].filter(
        (item: Credential) => item.hash === hash,
      )[0],
      stateProps.conveyServiceToken,
    ),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps);
