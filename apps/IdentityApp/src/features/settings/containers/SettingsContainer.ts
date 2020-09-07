import { connect } from 'react-redux';
import SettingsComponent from '../components/SettingsComponent';
import { RootState } from '../../../state/store';
import { StorageProvider, STORAGE_KEYS } from '../../../Providers';

const mapStateToProps = (state: RootState) => ({
  did: state.identity.identities[0] ? state.identity.identities[0] : null,
});

const mapDispatchToProps = () => ({
  getMnemonic: () =>
    StorageProvider.get(STORAGE_KEYS.IDENTITY)
      .then(res => res && JSON.parse(res))
      .then(res => res.mnemonic),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
