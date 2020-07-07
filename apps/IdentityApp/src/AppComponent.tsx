import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import WelcomeContainer from './screens/welcome/WelcomeContainer';
import {
  ViewMnemonicContainer,
  ConfirmMenommicContainer,
  CreatePinContainer,
  ConfirmPinContainer,
  RestoreWalletContainer,
} from './screens/signup';

import {CredentialsHomeContainer} from './screens/credentials/';

interface AppComponentProps {}

const AppComponent: React.FC<AppComponentProps> = () => {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={WelcomeContainer}
          options={{title: 'Overview', headerShown: false}}
        />
        <Stack.Screen
          name="MnemonicView"
          component={ViewMnemonicContainer}
          options={{title: 'Keep these words safe'}}
        />
        <Stack.Screen
          name="MnemonicConfirm"
          component={ConfirmMenommicContainer}
          options={{title: 'Confirm the phase'}}
        />

        <Stack.Screen
          name="RestoreWallet"
          component={RestoreWalletContainer}
          options={{title: 'Restore from Backup'}}
        />

        <Stack.Screen
          name="PinCreate"
          component={CreatePinContainer}
          options={{
            title: 'Create a Pin',
            headerLeft: null,
          }}
        />
        <Stack.Screen
          name="PinConfirm"
          component={ConfirmPinContainer}
          options={{title: 'Confirm your Pin'}}
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
