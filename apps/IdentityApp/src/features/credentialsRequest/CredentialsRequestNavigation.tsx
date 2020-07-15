import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import RequestTypeContainer from './containers/RequestTypeContainer';
import ConfirmComponent from './components/ConfirmComponent';

interface CredentialsRequestNavigationProps {}

const CredentialsRequestNavigation: React.FC<CredentialsRequestNavigationProps> = ({}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}>
      <Stack.Screen
        name="RequestType"
        component={RequestTypeContainer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ConfirmRequest"
        component={ConfirmComponent}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default CredentialsRequestNavigation;
