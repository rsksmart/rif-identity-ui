import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';

import ScannedPresentationsComponent from '../../features/scanned-presentations-list/ScannedPresentationsComponent';
import ValidPresentationComponent from '../../features/scanned-presentation/components/ValidPresentationComponent';
import InvalidPresentationComponent from '../../features/scanned-presentation/components/InvalidPresentationComponent';

export const Stack = createStackNavigator();

const PresentationNavigation: React.FC<{}> = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}
      initialRouteName="List">
      <Stack.Screen name="List" component={ScannedPresentationsComponent} options={{ headerShown: false }} />
      <Stack.Screen name="Valid" component={ValidPresentationComponent} options={{ headerShown: false }} />
      <Stack.Screen name="Invalid" component={InvalidPresentationComponent} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

export default connect(null, mapDispatchToProps)(PresentationNavigation);
