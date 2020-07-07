import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {CredentialsHomeContainer} from './screens/credentials';
import SignupNavigation from './screens/signup/SignupNavigation';

interface AppComponentProps {}

const AppComponent: React.FC<AppComponentProps> = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
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
