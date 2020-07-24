import { connect } from 'react-redux';
import { RootState } from '../../../state/store';
import { Credential } from '../reducer';
import QRDetailsComponent from '../components/QRDetailsComponent';
import { createPresentation } from '../operations';

const mapStateToProps = (state: RootState) => ({
  did: state.localUi.did,
  allCredentials: state.credentials.credentials,
  presentation: state.credentials.presentation,
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
