import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ProfileEditComponent from '../components/ProfileEditComponent';
import { RootState } from '../../../state/store';
import { saveProfile } from '../operations';
import { ProfileInterface } from '../reducer';
import * as AppNavigation from '../../../AppNavigation';

const mapStateToProps = (state: RootState) => ({
  profile: state.profile.profile,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleSave: (profile: ProfileInterface, navigation: any) => {
    if (dispatch(saveProfile(profile))) {
      navigation.navigate('View');
    }    
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleSave: (profile: ProfileInterface) => {
    dispatchProps.handleSave(profile, ownProps.navigation);
  },
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProfileEditComponent);
