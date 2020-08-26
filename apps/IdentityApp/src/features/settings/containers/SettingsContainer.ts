import { connect } from 'react-redux';
import SettingsComponent from '../components/SettingsComponent';
import { RootState } from '../../../state/store';

const mapStateToProps = (state: RootState) => ({
  credentials: state.credentials.credentials,
  mnemonic: state.identity.mnemonic,
  did: state.identity.did,
});

export default connect(mapStateToProps)(SettingsComponent);
