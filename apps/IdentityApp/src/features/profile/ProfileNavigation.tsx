import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootState } from '../../state/store';
import ProfileEditContainer from './containers/ProfileEditContainer';
import ProfileViewContainer from './containers/ProfileViewContainer';
import { initialStart } from './operations';

interface ProfileNavigationProps {
  isLoaded: boolean;
  isEditing: boolean;
  start: () => {};
}

const ProfileNavigation: React.FC<ProfileNavigationProps> = ({
  isEditing,
  start,
}) => {
  useEffect(() => {
    console.log('running initialStart()');
    start();
  }, [start]);
  return isEditing ? <ProfileEditContainer /> : <ProfileViewContainer />;
};

const mapStateToProps = (state: RootState) => ({
  isEditing: state.profile.isEditing,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: () => dispatch(initialStart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNavigation);
