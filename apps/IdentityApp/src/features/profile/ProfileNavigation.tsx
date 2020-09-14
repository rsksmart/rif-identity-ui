import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileEditContainer, ProfileViewContainer } from './containers';
import { SettingsContainer, DeveloperSettingsContainer } from '../settings/containers';

export const Stack = createStackNavigator();

const ProfileNavigation: React.FC = () => {
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

export default ProfileNavigation;
