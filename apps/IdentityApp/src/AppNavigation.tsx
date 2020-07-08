import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignupNavigation from './screens/signup/SignupNavigation';
import CredentialsNavigation from './screens/credentials/CredentialsNavigation';

interface AppComponentProps {
  checkingSingedUp: boolean;
  isSignedUp: boolean;
}

const AppComponent: React.FC<AppComponentProps> = ({
  checkingSingedUp,
  isSignedUp,
}) => {
  if (checkingSingedUp || isSignedUp === undefined) {
    return <View><Text>Loading...</Text></View>;
  }

  const Stack = createStackNavigator();
  console.log('isSignedUp?', checkingSingedUp, isSignedUp);
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={isSignedUp ? 'CredentialsFlow' : 'SignupFlow'}>
        <Stack.Screen
          name="SignupFlow"
          component={SignupNavigation}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CredentialsFlow"
          component={CredentialsNavigation}
          options={{title: 'Credentials', headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppComponent;
