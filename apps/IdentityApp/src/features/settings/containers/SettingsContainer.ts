import { connect } from 'react-redux';
import SettingsComponent from '../components/SettingsComponent';
import { RootState } from '../../../state/store';
import { mnemonicStore } from '../../../daf/dafSetup';

const mapStateToProps = (state: RootState) => ({
  did: state.identity.identities[0] ? state.identity.identities[0] : null,
});

const mapDispatchToProps = () => ({
  getMnemonic: async () => await mnemonicStore.get(),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
