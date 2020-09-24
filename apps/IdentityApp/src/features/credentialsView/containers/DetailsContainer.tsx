import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { DetailsComponent } from '../components';
import { RootState } from '../../../state/store';
import { Credential } from '../reducer';
import { removeCredential } from '../operations';
import conveyConnect from './ConveyConnect'

const mapStateToProps = (state: RootState) => ({
  allCredentials: state.credentials.credentials,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  removeCredential: (hash: string) => dispatch(removeCredential(hash)),
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  credential: stateProps.allCredentials.filter(
    (item: Credential) => item.hash === ownProps.route.params.credentialHash,
  )[0]
});

export default conveyConnect(connect(mapStateToProps, mapDispatchToProps, mergeProps)(DetailsComponent));
