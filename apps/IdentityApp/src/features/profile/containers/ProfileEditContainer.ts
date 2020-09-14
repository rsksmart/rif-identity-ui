import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import ProfileEditComponent from '../components/ProfileEditComponent';
import { RootState } from '../../../state/store';
import { saveProfile } from '../operations';
import { ProfileInterface } from '../reducer';

const mapStateToProps = (state: RootState) => ({
  declarativeDetails: state.declarativeDetails,
  did: state.identity.identities[0],
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleSave: (profile: ProfileInterface, navigation: any) => {
    const callback = (err: any) => {
      if (err) {
        throw err;
      }
      navigation.navigate('View');
    };
    dispatch(saveProfile(profile, callback));
  },
});

const mergeProps = (stateProps, dispatchProps, ownProps) => ({
  ...stateProps,
  ...dispatchProps,
  ...ownProps,
  handleSave: (profile: ProfileInterface) => {
    dispatchProps.handleSave(profile, ownProps.navigation);
  },
  profile: stateProps.declarativeDetails[stateProps.did] || [],
});

export default connect(mapStateToProps, mapDispatchToProps, mergeProps)(ProfileEditComponent);
