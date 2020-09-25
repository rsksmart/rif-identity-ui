import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DetailsComponent } from '../components';
import { RootState } from '../../../state/store';
import { Credential } from '../reducer';
import { createPresentation, removeIssuedCredential, removeRequestedCredential } from '../operations';
import { Credential as RifCredential } from 'jesse-rif-id-core/src/reducers/credentials';
import * as RootNavigation from '../../../AppNavigation';
import { IssuedCredentialRequest } from 'jesse-rif-id-core/lib/reducers/issuedCredentialRequests';

const mapStateToProps = (state: RootState) => ({
  allCredentials: state.credentials.credentials,
  did: state.identity.identities[0],
  issuedCredentials: state.issuedCredentials,
  requestedCredentials: state.requestedCredentials,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  createPresentation: (credential: RifCredential) => dispatch(createPresentation(credential.raw)),
  removeCredential: (credential?: RifCredential, requestedCredential?: IssuedCredentialRequest) => {
    const callback = (err: Error) => {
      if (!err) {
        RootNavigation.navigate('CredentialsFlow', {
          screen: 'CredentialsHome',
        });
      } else {
        console.log('err', err);
        return false;
      }
    };

    return credential
      ? dispatch(removeIssuedCredential(credential, callback))
      : dispatch(removeRequestedCredential(requestedCredential, callback));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  getCredential: () => {
    if (!stateProps.issuedCredentials[stateProps.did]) {
      return RootNavigation.navigate('CredentialsHome');
    }

    return stateProps.issuedCredentials[stateProps.did].filter(
      (item: RifCredential) => item.hash === ownProps.route.params.credentialIdentifier,
    )[0];
  },
  getCredentialRequest: () => {
    if (!stateProps.requestedCredentials[stateProps.did]) {
      return RootNavigation.navigate('CredentialsHome');
    }

    return stateProps.requestedCredentials[stateProps.did].filter(
      (item: IssuedCredentialRequest) => item.id === ownProps.route.params.credentialIdentifier,
    )[0];
  },
  createPresentation: (hash: string) =>
    dispatchProps.createPresentation(
      stateProps.allCredentials.filter((item: Credential) => item.hash === hash)[0],
    ),
});

export default conveyConnect(connect(mapStateToProps, mapDispatchToProps, mergeProps)(DetailsComponent));
