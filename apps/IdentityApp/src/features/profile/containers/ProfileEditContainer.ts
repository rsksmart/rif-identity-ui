import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ProfileEditComponent from '../components/ProfileEditComponent';
import { RootState } from '../../../state/store';
import { saveProfile } from '../operations';
import { ProfileInterface } from '../reducer';

const mapStateToProps = (state: RootState) => ({
  fullName: state.profile.profile.fullName,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleSave: (profile: ProfileInterface) => dispatch(saveProfile(profile)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileEditComponent);
