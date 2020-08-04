import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import { ProfileEditContainer, ProfileViewContainer, SettingsContainer } from './containers';

import { initialStart } from './operations';
import { ViewMnemonicContainer, ConfirmMnemonicContainer } from '../identity';

export const Stack = createStackNavigator();

interface ProfileNavigationProps {
  start: () => {};
}

const ProfileNavigation: React.FC<ProfileNavigationProps> = ({ start }) => {
  useEffect(() => {
    start();
  }, [start]);

  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}
      initialRouteName="View">
      <Stack.Screen name="View" component={ProfileViewContainer} options={{ headerShown: false }} />
      <Stack.Screen name="Edit" component={ProfileEditContainer} options={{ headerShown: false }} />
      <Stack.Screen name="Settings" component={SettingsContainer} options={{ headerShown: false }} />
      <Stack.Screen name="CreateMnemonic" component={ViewMnemonicContainer} options={{ headerShown: false }} />
      <Stack.Screen name="MnemonicConfirm" component={ConfirmMnemonicContainer} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: () => dispatch(initialStart()),
});

export default connect(null, mapDispatchToProps)(ProfileNavigation);
