import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileEditContainer, ProfileViewContainer } from './containers';
import { getProfileFromLocalStorage } from './operations';
import { SettingsContainer, DeveloperSettingsContainer } from '../settings/containers';
import { RootState } from '../../state/store';
import LoadingComponent from '../../Libraries/Loading/LoadingComponent';

export const Stack = createStackNavigator();

interface ProfileNavigationProps {
  isLoaded: boolean;
  start: () => {};
}

const ProfileNavigation: React.FC<ProfileNavigationProps> = ({ start, isLoaded }) => {
  useEffect(() => {
    if (!isLoaded) {
      start();
    }
  }, [start, isLoaded]);

  if (!isLoaded) {
    return <LoadingComponent />;
  }

  const options = { headerShown: false };
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}
      initialRouteName="View">
      <Stack.Screen name="View" component={ProfileViewContainer} options={options} />
      <Stack.Screen name="Edit" component={ProfileEditContainer} options={options} />
      <Stack.Screen name="Settings" component={SettingsContainer} options={options} />
      <Stack.Screen name="Advanced" component={DeveloperSettingsContainer} options={options} />
    </Stack.Navigator>
  );
};

const mapStateToProps = (state: RootState) => ({
  isLoaded: state.profile.isLoaded,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: () => dispatch(getProfileFromLocalStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileNavigation);
