import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ScanQRContainer from './scan-qr/ScanQRContainer';
import PresentationNavigation from './presentations/PresentationNavigation';
import { Icon } from 'react-native-vector-icons/Icon';

const MainFlowNavigation: React.FC<{}> = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="ScannedPresentations"
      tabBarOptions={{ style: { height: 95 } }}>
      <Tab.Screen
        name="PresentationNavigation"
        component={PresentationNavigation}
      />
      <Tab.Screen
        name="ScanQR"
        component={ScanQRContainer}
      />
      {/* <Tab.Screen
        name="Profile"
        component={ProfileContainer}
      /> */}
    </Tab.Navigator>
  );
};

export default connect()(MainFlowNavigation);
