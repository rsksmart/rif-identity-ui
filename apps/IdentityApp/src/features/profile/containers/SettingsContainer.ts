import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import SettingsComponent from '../components/SettingsComponent';
import { RootState } from '../../../state/store';
import { signOutAndReset } from '../operations';
import { Credential } from '../../credentialsView/reducer';
import { checkStatusOfCredentials } from '../../credentialsView/operations';

const mapStateToProps = (state: RootState) => ({
  version: state.localUi.appVersion,
  credentials: state.credentials.credentials,
  mnemonic: state.identity.mnemonic,
  did: state.identity.did,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startOverPress: () => dispatch(signOutAndReset()),
  reverify: (credentials: Credential[], did: string) =>
    dispatch(checkStatusOfCredentials(credentials, did, null))
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  reverify: () => dispatchProps.reverify(stateProps.credentials, stateProps.did),
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(SettingsComponent);
