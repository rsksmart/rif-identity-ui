import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import ProfileEditContainer from './containers/ProfileEditContainer';
import ProfileViewContainer from './containers/ProfileViewContainer';
import { initialStart } from './operations';

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
    </Stack.Navigator>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: () => dispatch(initialStart()),
});

export default connect(null, mapDispatchToProps)(ProfileNavigation);
