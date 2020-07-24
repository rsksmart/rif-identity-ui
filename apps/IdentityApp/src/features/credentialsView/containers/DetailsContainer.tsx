import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DetailsComponent } from '../components';
import { RootState } from '../../../state/store';
import { Credential } from '../reducer';
import { removeCredential, createPresentation } from '../operations';

const mapStateToProps = (state: RootState) => ({
  allCredentials: state.credentials.credentials,
  did: state.localUi.did,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeCredential: (hash: string) => dispatch(removeCredential(hash)),
  createPresentation: (didHash: string) => dispatch(createPresentation(didHash)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  credential: stateProps.allCredentials.filter(
    (item: Credential) => item.hash === ownProps.route.params.credentialHash,
  )[0],
  createPresentation: (hash: string) => dispatchProps.createPresentation(stateProps.did + hash),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(DetailsComponent);
