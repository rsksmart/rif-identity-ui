import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { SignupNavigation, CredentialsNavigation } from './screens';
import LoadingComponent from './Libraries/Loading/LoadingComponent';

/**
 * Create a reference for the Navigation container and navigate function
 */
export const navigationRef: any = React.createRef();

export const navigate = (name: string, params?: any) =>
  navigationRef.current?.navigate(name, params);

export const goBack = () => navigationRef.current?.goBack();

const AppNavigation = () => {
  const Stack = createStackNavigator();
  const options = { headerShown: false };
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}
        initialRouteName="Loading">
        <Stack.Screen name="Loading" component={LoadingComponent} options={options} />
        <Stack.Screen name="SignupFlow" component={SignupNavigation} options={options} />
        <Stack.Screen name="CredentialsFlow" component={CredentialsNavigation} options={options} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigation;
