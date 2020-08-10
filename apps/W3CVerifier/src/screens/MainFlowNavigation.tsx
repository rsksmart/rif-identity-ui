import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ScanQRContainer from './scan-qr/ScanQRContainer';
import PresentationNavigation from './presentations/PresentationNavigation';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';

const MainFlowNavigation: React.FC<{}> = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="ScannedPresentations"
      tabBarOptions={{ style: { height: 95 } }}>
      <Tab.Screen
        name="PresentationNavigation"
        component={PresentationNavigation}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <IconMaterial
              name="format-list-bulleted"
              size={35}
              color={focused ? '#008FF7' : '#50555C'}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ScanQR"
        component={ScanQRContainer}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({ focused }) => (
            <IconMaterial
              name="qrcode-scan"
              size={35}
              color={focused ? '#008FF7' : '#50555C'}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Profile"
        component={ProfileContainer}
      /> */}
    </Tab.Navigator>
  );
};

export default connect()(MainFlowNavigation);
