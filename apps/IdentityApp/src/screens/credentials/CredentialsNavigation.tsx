import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import { CredentialsHomeContainer, SigninWithPinContainer } from './containers';
import { ProfileNavigation } from '../../features/profile/index';
import { RootState } from '../../state/store';

interface CredentialsNavigationProps {
  isLoggedIn: boolean;
}

const CredentialsNavigation: React.FC<CredentialsNavigationProps> = ({
  isLoggedIn,
}) => {
  if (!isLoggedIn) {
    return <SigninWithPinContainer />;
  }

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="CredentialsHome">
      <Tab.Screen
        name="CredentialsHome"
        component={CredentialsHomeContainer}
        options={{
          tabBarLabel: 'Credentials',
          tabBarIcon: () => <Icon name="home-outline" size={28} />,
        }}
      />
      <Tab.Screen
        name="AddCredential"
        component={CredentialsHomeContainer}
        options={{
          tabBarLabel: 'Add',
          tabBarIcon: () => <Icon name="add-circle-outline" size={28} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: () => <Icon name="person-outline" size={28} />,
        }}
      />
    </Tab.Navigator>
  );
};

// container:
const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.localUi.isLoggedIn,
});

export default connect(mapStateToProps)(CredentialsNavigation);
// export default CredentialsNavigation;
