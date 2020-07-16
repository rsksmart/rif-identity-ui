import { connect } from 'react-redux';
import ProfileViewComponent from '../components/ProfileViewComponent';
import { RootState } from '../../../state/store';
import { isEmpty } from '../operations';
import { signOutAndReset } from '../../../screens/credentials/operations';

const mapStateToProps = (state: RootState) => ({
  profile: state.profile.profile,
  isEmpty: isEmpty(state.profile.profile),
  version: state.localUi.appVersion,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  startOverPress: () => dispatch(signOutAndReset()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileViewComponent);
