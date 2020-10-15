import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import WelcomeContainer from '../features/welcome/WelcomeContainer';
import { ViewMnemonicContainer, ConfirmMnemonicContainer } from '../features/identity';
import { CreatePinContainer, ConfirmPinContainer } from '../features/pin';
import RestoreWalletContainer from '../features/restore/RestoreWalletContainer';

interface SignupNavigationProps {}

const SignupNavigation: React.FC<SignupNavigationProps> = ({}) => {
  const options = { headerShown: false };
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}>
      <Stack.Screen name="Welcome" component={WelcomeContainer} options={{ headerShown: false }} />
      <Stack.Screen name="MnemonicView" component={ViewMnemonicContainer} options={options} />
      <Stack.Screen name="MnemonicConfirm" component={ConfirmMnemonicContainer} options={options} />
      <Stack.Screen name="RestoreWallet" component={RestoreWalletContainer} options={options} />
      <Stack.Screen name="PinCreate" component={CreatePinContainer} options={options} />
      <Stack.Screen name="PinConfirm" component={ConfirmPinContainer} options={options} />
    </Stack.Navigator>
  );
};

export default SignupNavigation;
