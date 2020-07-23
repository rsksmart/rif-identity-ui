import { connect } from 'react-redux';
import SettingsComponent from '../components/SettingsComponent';
import { RootState } from '../../../state/store';
import { signOutAndReset } from '../../../screens/credentials/operations';

const mapStateToProps = (state: RootState) => ({
  version: state.localUi.appVersion,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startOverPress: () => dispatch(signOutAndReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsComponent);
