import React, { useEffect } from 'react';
import { Dispatch } from 'redux';
import { createStackNavigator } from '@react-navigation/stack';
import { SummaryContainer, DetailsContainer } from './containers';
import { connect } from 'react-redux';
/* import { AppState } from 'react-native';
import { logout } from '../../state/localUi/actions';

interface CredentailsViewNavigationProps {
  start: () => {};
  credentialsLoaded: boolean;
  handleAppStateChange: (state: string) => {};
}
*/
const CredentailsViewNavigation: React.FC<CredentailsViewNavigationProps> = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: '#FFFFFF' } }}
      initialRouteName="Summary">
      <Stack.Screen name="Summary" component={SummaryContainer} options={{ headerShown: false }} />
      <Stack.Screen
        name="Details"
        component={DetailsContainer}
        options={{ headerShown: false }}
        initialParams={{ credential: null }}
      />
    </Stack.Navigator>
  );
};
/*
const mapDispatchToProps = (dispatch: Dispatch<any>) => ({
  handleAppStateChange: (state: string) => state !== 'active' && dispatch(logout()),
});
*/
export default CredentailsViewNavigation; /*connect(null, null)();*/
