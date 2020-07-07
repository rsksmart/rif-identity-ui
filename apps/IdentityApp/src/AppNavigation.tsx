import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {CredentialsHomeContainer} from './screens/credentials';
import SignupNavigation from './screens/signup/SignupNavigation';

interface AppComponentProps {
  checkingSingedUp: boolean;
  isSignedUp: boolean;
}

const AppComponent: React.FC<AppComponentProps> = ({
  checkingSingedUp,
  isSignedUp,
}) => {
  if (checkingSingedUp || isSignedUp === undefined) {
    return <Text>Loading</Text>;
  }

  const Stack = createStackNavigator();
  console.log('isSignedUp?', checkingSingedUp, isSignedUp);
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
