import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RequestTypeContainer from './containers/RequestTypeContainer';
import ConfirmContainer from './containers/ConfirmContainer';

interface CredentialsRequestNavigationProps {}

const CredentialsRequestNavigation: React.FC<CredentialsRequestNavigationProps> = ({}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}>
      <Stack.Screen
        name="RequestType"
        component={RequestTypeContainer}
        options={{ headerShown: false }}
        initialParams={{ types: ['AUTO', 'PASSPORT', 'ID'] }}
      />
      <Stack.Screen
        name="ConfirmRequest"
        component={ConfirmContainer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CredentialsRequestNavigation;
