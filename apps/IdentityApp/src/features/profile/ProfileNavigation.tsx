import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileEditContainer, ProfileViewContainer } from './containers';
import { initialStart } from './operations';
import { SettingsContainer, DeveloperSettingsContainer } from '../settings/containers';

export const Stack = createStackNavigator();

interface ProfileNavigationProps {
  start: () => {};
}

const ProfileNavigation: React.FC<ProfileNavigationProps> = ({ start }) => {
  useEffect(() => {
    start();
  }, [start]);

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: () => dispatch(initialStart()),
});

export default connect(null, mapDispatchToProps)(ProfileNavigation);
