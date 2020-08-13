import React, { useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SummaryContainer, DetailsContainer } from './containers';
import { connect } from 'react-redux';
import { getCredentialsFromStorage } from './operations';
import { RootState } from '../../state/store';

interface CredentailsViewNavigationProps {
  start: () => {};
  credentialCount: number;
}

const CredentailsViewNavigation: React.FC<CredentailsViewNavigationProps> = ({
  start,
  credentialCount,
}) => {
  useEffect(() => {
    if (credentialCount === 0) {
      start();
    }
  }, [start, credentialCount]);

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
  credentialCount: state.credentials.credentials.length,
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  start: () => dispatch(getCredentialsFromStorage()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CredentailsViewNavigation);
