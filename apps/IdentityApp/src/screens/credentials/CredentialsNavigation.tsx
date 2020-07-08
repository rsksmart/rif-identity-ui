import React from 'react';
import {connect} from 'react-redux';
import {createStackNavigator} from '@react-navigation/stack';
import {CredentialsHomeContainer, SigninWithPinContainer} from './containers';
import {RootState} from '../../state/store';

interface CredentialsNavigationProps {
  isLoggedIn: boolean;
}

const CredentialsNavigation: React.FC<CredentialsNavigationProps> = ({
  isLoggedIn,
}) => {
  console.log('isLoggedIn?', isLoggedIn);

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName={isLoggedIn ? 'CredentialsHome' : 'SigninWithPin'}>
      <Stack.Screen
        name="CredentialsHome"
        component={CredentialsHomeContainer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SigninWithPin"
        component={SigninWithPinContainer}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

// container:
const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.localUi.isLoggedIn,
});

export default connect(mapStateToProps)(CredentialsNavigation);
// export default CredentialsNavigation;
