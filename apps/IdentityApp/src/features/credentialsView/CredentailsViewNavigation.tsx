import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SummaryContainer, DetailsContainer } from './containers';
import { connect } from 'react-redux';
import { AppState } from 'react-native';
import { getCredentialsFromStorage } from './operations';
import { RootState } from '../../state/store';
import { logout } from '../../state/localUi/actions';

interface CredentailsViewNavigationProps {
  start: () => {};
  credentialsLoaded: boolean;
  handleAppStateChange: (state: string) => {};
}

const CredentailsViewNavigation: React.FC<CredentailsViewNavigationProps> = ({
  start,
  credentialsLoaded,
  handleAppStateChange,
}) => {
  useEffect(() => {
    if (!credentialsLoaded) {
      start();
      AppState.addEventListener('change', handleAppStateChange);
    }
  }, [start, credentialsLoaded, handleAppStateChange]);

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

const mapStateToProps = (state: RootState) => ({
  credentialsLoaded: state.credentials.credentials ? true : false,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: () => dispatch(getCredentialsFromStorage()),
  handleAppStateChange: (state: string) => state !== 'active' && dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CredentailsViewNavigation);
