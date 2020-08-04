import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { WelcomeContainer } from './index';
import { ViewMnemonicContainer, ConfirmMnemonicContainer } from '../../features/identity';
import { CreatePinContainer, ConfirmPinContainer } from '../../features/pin';
import RestoreWalletContainer from '../../features/restore/RestoreWalletContainer';

interface SignupNavigationProps {}

const SignupNavigation: React.FC<SignupNavigationProps> = ({}) => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}>
      <Stack.Screen name="Welcome" component={WelcomeContainer} options={{ headerShown: false }} />

      <Stack.Screen
        name="MnemonicView"
        component={ViewMnemonicContainer}
        options={{ title: 'Keep these words safe' }}
      />
      <Stack.Screen
        name="MnemonicConfirm"
        component={ConfirmMnemonicContainer}
        options={{ title: 'Confirm the phase' }}
      />

      <Stack.Screen
        name="RestoreWallet"
        component={RestoreWalletContainer}
        options={{ title: 'Restore from Backup' }}
      />

      <Stack.Screen
        name="PinCreate"
        component={CreatePinContainer}
        options={{
          title: 'Create a Pin',
          headerLeft: undefined,
        }}
      />
      <Stack.Screen
        name="PinConfirm"
        component={ConfirmPinContainer}
        options={{ title: 'Confirm your Pin' }}
      />
    </Stack.Navigator>
  );
};

export default SignupNavigation;
