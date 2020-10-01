import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SummaryContainer, DetailsContainer } from './containers';

const CredentailsViewNavigation: React.FC = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}
      initialRouteName="Summary">
      <Stack.Screen name="Summary" component={SummaryContainer} options={{ headerShown: false }} />
      <Stack.Screen
        name="Details"
        component={DetailsContainer}
        options={{ headerShown: false }}
        initialParams={{ credential: null }}
      />
    </Stack.Navigator>
  );
};

export default CredentailsViewNavigation;
