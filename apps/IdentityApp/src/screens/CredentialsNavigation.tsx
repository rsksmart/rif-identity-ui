import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

import { SigninWithPinContainer } from '../features/pin';
import CredentailsViewNavigation from '../features/credentialsView/CredentailsViewNavigation';
import CredentialsRequestNavigation from '../features/credentialsRequest/CredentialsRequestNavigation';
import { ProfileNavigation } from '../features/profile/index';
import { RootState } from '../state/store';
import { StyleSheet } from 'react-native';

interface CredentialsNavigationProps {
  isLoggedIn: boolean;
  hasMnemonic: boolean;
}

const CredentialsNavigation: React.FC<CredentialsNavigationProps> = ({ isLoggedIn, hasMnemonic }) => {
  if (!isLoggedIn) {
    return <SigninWithPinContainer />;
  }

  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator initialRouteName="CredentialsHome" tabBarOptions={{ style: { height: 95 } }}>
      <Tab.Screen
        name="CredentialsHome"
        component={CredentailsViewNavigation}
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
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.popToTop();
            navigation.navigate('CredentialsFlow', {
              screen: 'CredentialsHome',
              params: { screen: 'Summary' },
            });
          },
        })}
      />
      <Tab.Screen
        name="AddCredential"
        component={CredentialsRequestNavigation}
        options={{
          tabBarLabel: '',
          tabBarIcon: () => (
            <Icon
              name="add-circle"
              size={75}
              color={hasMnemonic ? '#50555C' : '#e1e1e1'}
              style={styles.circlePlusIcon}
            />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            if (hasMnemonic) {
              navigation.popToTop();
              navigation.navigate('CredentialsFlow', {
                screen: 'AddCredential',
              });
            }
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileNavigation}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <Icon name={focused ? 'person' : 'person-outline'} size={35} color="#50555C" />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.popToTop();
            navigation.navigate('CredentialsFlow', {
              screen: 'Profile',
            });
          },
        })}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  circlePlusIcon: {
    marginTop: 15,
  },
});

// container:
const mapStateToProps = (state: RootState) => ({
  isLoggedIn: state.localUi.isLoggedIn,
  hasMnemonic: state.identity.identities.length !== 0,
});

export default connect(mapStateToProps)(CredentialsNavigation);
// export default CredentialsNavigation;
