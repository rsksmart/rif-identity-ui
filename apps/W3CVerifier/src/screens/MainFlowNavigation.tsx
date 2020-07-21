import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { RootState } from '../state/store';
import VerifiedPresentationsContainer from './verified-presentations/VerifiedPresentationsContainer';
import Icon from 'react-native-vector-icons/Ionicons';
import ScanQRContainer from './scan-qr/ScanQRContainer';
import ProfileContainer from './profile/ProfileContainer';

const MainFlowNavigation: React.FC<{}> = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="VerifiedPresentations"
      tabBarOptions={{ style: { height: 95 } }}>
      <Tab.Screen
        name="VerifiedPresentations"
        component={VerifiedPresentationsContainer}
      />
      <Tab.Screen
        name="ScanQR"
        component={ScanQRContainer}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileContainer}
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

const mapStateToProps = (state: RootState) => ({
});

export default connect(mapStateToProps)(MainFlowNavigation);
