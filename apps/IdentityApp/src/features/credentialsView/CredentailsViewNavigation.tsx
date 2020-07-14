import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SummaryContainer, DetailsContainer } from './containers';

interface CredentailsViewNavigationProps {}

const CredentailsViewNavigation: React.FC<CredentailsViewNavigationProps> = ({}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}>
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
