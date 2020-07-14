import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

import { CredentialsHomeContainer, SigninWithPinContainer } from './containers';
import { ProfileNavigation } from '../../features/profile/index';
import { RootState } from '../../state/store';

interface CredentialsNavigationProps {
  isLoggedIn: boolean;
}

const CredentialsNavigation: React.FC<CredentialsNavigationProps> = ({ isLoggedIn }) => {
  if (!isLoggedIn) {
    return <SigninWithPinContainer />;
  }

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="CredentialsHome"
      tabBarOptions={{ style: { height: 95 } }}>
      <Tab.Screen
        name="CredentialsHome"
        component={CredentialsHomeContainer}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <IconMaterial
              name={focused ? 'badge-account-horizontal' : 'badge-account-horizontal-outline'}
              size={35}
              color="#50555C"
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddCredential"
        component={CredentialsHomeContainer}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Icon name="add-circle" size={75} color={'#50555C'} style={{ marginTop: 15 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? 'person' : 'person-outline'} size={35} color={'#50555C'} />
          ),
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
