import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {CredentialsHomeContainer} from './screens/credentials';
import SignupNavigation from './screens/signup/SignupNavigation';

interface AppComponentProps {
  isSignedUp: boolean;
}

const AppComponent: React.FC<AppComponentProps> = ({isSignedUp}) => {
  const Stack = createStackNavigator();
  console.log('isSignedUp?', isSignedUp);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isSignedUp ? 'CredentialsHome' : 'WelcomeHome'}>
        <Stack.Screen
          name="WelcomeHome"
          component={SignupNavigation}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CredentialsHome"
          component={CredentialsHomeContainer}
          options={{title: 'Credentials', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppComponent;
