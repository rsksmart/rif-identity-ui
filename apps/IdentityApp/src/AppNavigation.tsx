import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { BackHandler } from 'react-native';

import { SignupNavigation, CredentialsNavigation } from './screens';
import LoadingComponent from './Libraries/Loading/LoadingComponent';
import { RootState } from './state/store';

/**
 * Create a reference for the Navigation container and navigate function
 */
export const navigationRef: any = React.createRef();

export const navigate = (name: string, params?: any) =>
  navigationRef.current?.navigate(name, params);

export const goBack = () => navigationRef.current?.goBack();

/**
 * App Navigation Component
 */
interface AppComponentProps {
  checkingSingedUp: boolean;
}

const AppComponent: React.FC<AppComponentProps> = ({ checkingSingedUp }) => {
  // prevent Android back button:
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => true);
    return () => BackHandler.removeEventListener('hardwareBackPress', () => true);
  }, []);

  if (checkingSingedUp) {
    return <LoadingComponent />;
  }

  const Stack = createStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}>
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

const mapStateToProps = (state: RootState) => ({
  checkingSingedUp: state.localUi.checkingSingedUp,
});

export default connect(mapStateToProps)(AppComponent);
