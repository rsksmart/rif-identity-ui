import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DetailsComponent } from '../components';
import { RootState } from '../../../state/store';
import { Credential } from '../reducer';
import conveyConnect from './ConveyConnect'
import { removeCredential, createPresentation, removeIssuedCredential } from '../operations';
import { Credential as RifCredential } from 'jesse-rif-id-core/src/reducers/credentials';
import * as RootNavigation from '../../../AppNavigation';

const mapStateToProps = (state: RootState) => ({
  allCredentials: state.credentials.credentials,
  did: state.identity.identities[0],
  issuedCredentials: state.issuedCredentials,
});

const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  createPresentation: (credential: RifCredential) => dispatch(createPresentation(credential.raw)),
  removeCredential: (did: string, raw: string, hash: string, status: string) => {
    const callback = (err: Error) => {
      if (!err) {
        return true;
      } else {
        console.log('err', err);
        return false;
      }
    };
    return status === 'CERTIFIED'
      ? dispatch(removeIssuedCredential(did, raw, hash, callback))
      : dispatch(removeCredential(did, raw, callback));
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
      (item: RifCredential) => item.hash === ownProps.route.params.credentialHash,
    )[0];
  },
  createPresentation: (hash: string) =>
    dispatchProps.createPresentation(
      stateProps.allCredentials.filter((item: Credential) => item.hash === hash)[0],
    ),
  removeCredential: (raw: string, hash: string, status: string) =>
    dispatchProps.removeCredential(stateProps.did, raw, hash, status),
});

export default conveyConnect(connect(mapStateToProps, mapDispatchToProps, mergeProps)(DetailsComponent));
