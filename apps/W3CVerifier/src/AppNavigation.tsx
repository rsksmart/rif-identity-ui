import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoadingComponent from './screens/shared/LoadingComponent';
import MainFlowNavigation from './screens/MainFlowNavigation';
import { BackHandler } from 'react-native';

/**
 * Create a reference for the Navigation container and navigate function
 */
export const navigationRef: any = React.createRef();

export function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}

interface AppComponentProps {
}

const AppComponent: React.FC<AppComponentProps> = ({}) => {
  // prevent Android back button:
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);
  
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
          name="MainFlow"
          component={MainFlowNavigation}
          options={{ title: 'MainFlow', headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppComponent;
