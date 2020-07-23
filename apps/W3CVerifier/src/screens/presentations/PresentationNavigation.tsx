import React from 'react';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import ScannedPresentationsContainer from '../../features/scanned-presentations-list/ScannedPresentationsContainer';
import ValidPresentationContainer from '../../features/scanned-presentation/containers/ValidPresentationContainer';
import InvalidPresentationContainer from '../../features/scanned-presentation/containers/InvalidPresentationContainer';

export const Stack = createStackNavigator();

const PresentationNavigation: React.FC<{}> = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}
      initialRouteName="List">
      <Stack.Screen name="List" component={ScannedPresentationsContainer} options={{ headerShown: false }} />
      <Stack.Screen name="Valid" component={ValidPresentationContainer} options={{ headerShown: false }} />
      <Stack.Screen name="Invalid" component={InvalidPresentationContainer} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default connect()(PresentationNavigation);
