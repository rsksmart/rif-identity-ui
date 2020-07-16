import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SummaryContainer, DetailsContainer } from './containers';
import { connect } from 'react-redux';
import { getCredentialsFromStorage } from './operations';

interface CredentailsViewNavigationProps {
  start: () => {};
}

const CredentailsViewNavigation: React.FC<CredentailsViewNavigationProps> = ({ start }) => {
  useEffect(() => {
    console.log('using effect!');
    start();
  }, [start]);

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

const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: () => dispatch(getCredentialsFromStorage()),
});

export default connect(null, mapDispatchToProps)(CredentailsViewNavigation);
