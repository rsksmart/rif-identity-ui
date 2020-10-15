import React from 'react';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ScanQRContainer from './scan-qr/ScanQRContainer';
import PresentationNavigation from './presentations/PresentationNavigation';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import { goToScanner } from '../features/operations';

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  handleGoToScanner: () => dispatch(goToScanner())
});

interface MainFlowProps {
  handleGoToScanner: () => void
}

const MainFlowNavigation: React.FC<MainFlowProps> = ({
  handleGoToScanner,
}) => {
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
        listeners={({ navigation }) => ({
          tabPress: event => {
            event.preventDefault();
            navigation.navigate('PresentationNavigation', { screen: 'List' });
          },
        })}
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
        listeners={() => ({
          tabPress: event => {
            event.preventDefault();
            handleGoToScanner()
          },
        })}
      />
      {/* <Tab.Screen
        name="Profile"
        component={ProfileContainer}
      /> */}
    </Tab.Navigator>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MainFlowNavigation);
