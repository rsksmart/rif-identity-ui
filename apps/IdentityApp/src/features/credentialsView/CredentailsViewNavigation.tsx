import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SummaryContainer, DetailsContainer } from './containers';
import { create } from 'react-test-renderer';

interface CredentailsViewNavigationProps {

}

const CredentailsViewNavigation: React.FC<CredentailsViewNavigationProps> = ({}) => {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}>
      <Stack.Screen
        name="Summary"
        component={SummaryContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsContainer}
        options={{ headerShown: false }}
        initialParams={{ credential: null }}
      />
      <Drawer.Screen name="Notifications" component={DetailsContainer} />
    </Stack.Navigator>
  );
};

export default CredentailsViewNavigation;
