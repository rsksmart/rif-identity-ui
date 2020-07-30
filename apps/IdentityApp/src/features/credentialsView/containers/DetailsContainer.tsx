import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DetailsComponent } from '../components';
import { RootState } from '../../../state/store';
import { Credential } from '../reducer';
import { removeCredential, createPresentation } from '../operations';

const mapStateToProps = (state: RootState) => ({
  allCredentials: state.credentials.credentials,
  address: state.localUi.address,
  privateKey: state.localUi.privateKey,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeCredential: (hash: string) => dispatch(removeCredential(hash)),
  createPresentation: (credential: Credential, address: string, privateKey: string) =>
    dispatch(createPresentation(credential.jwt, address, privateKey)),
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
      stateProps.address,
      stateProps.privateKey,
    ),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DetailsComponent);
