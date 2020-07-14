import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import SignupNavigation from './screens/signup/SignupNavigation';
import CredentialsNavigation from './screens/credentials/CredentialsNavigation';
import LoadingComponent from './screens/Shared/LoadingComponent';

/**
 * Create a reference for the Navigation container and navigate function
 */
export const navigationRef: any = React.createRef();

export const navigate = (name: string, params: any) =>
  navigationRef.current?.navigate(name, params);

export const goBack = () => navigationRef.current?.goBack();

/**
 * App Navigation Component
 */
interface AppComponentProps {
  checkingSingedUp: boolean;
  isSignedUp: boolean;
}

const AppComponent: React.FC<AppComponentProps> = ({}) => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}>
        <Stack.Screen
          name="Loading"
          component={LoadingComponent}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignupFlow"
          component={SignupNavigation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CredentialsFlow"
          component={CredentialsNavigation}
          options={{ title: 'Credentials', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppComponent;
