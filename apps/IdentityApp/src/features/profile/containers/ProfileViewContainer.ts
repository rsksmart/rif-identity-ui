import { connect } from 'react-redux';
import ProfileViewComponent from '../components/ProfileViewComponent';
import { RootState } from '../../../state/store';
import { isEmpty } from '../operations';

const mapStateToProps = (state: RootState) => ({
  profile: state.profile.profile,
  isEmpty: isEmpty(state.profile.profile),
});

export default connect(mapStateToProps, null)(ProfileViewComponent);
