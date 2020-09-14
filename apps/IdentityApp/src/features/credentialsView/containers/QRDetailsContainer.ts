import { connect } from 'react-redux';
import { RootState } from '../../../state/store';
import { Credential } from '../reducer';
import QRDetailsComponent from '../components/QRDetailsComponent';

const mapStateToProps = (state: RootState) => ({
  did: state.identity.identities[0],
  allCredentials: state.credentials.credentials,
  presentationUrl: state.credentials.presentationUrl,
  presentationPwd: state.credentials.presentationPwd,
  presentationHash: state.credentials.presentationHash,
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  credential: stateProps.allCredentials.filter(
    (item: Credential) => item.hash === ownProps.credentialHash,
  )[0],
});

export default connect(mapStateToProps, null, mergeProps)(QRDetailsComponent);
