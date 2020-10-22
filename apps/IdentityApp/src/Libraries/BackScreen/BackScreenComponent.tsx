import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, StyleProp } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as RootNavigation from '../../AppNavigation';

interface BackScreenComponentProps {
  children: React.ReactNode;
  visible?: boolean;
  style?: StyleProp<any>;
  overrideBack?: {
    location: string;
    params?: {};
  };
}

const BackScreenComponent: React.FC<BackScreenComponentProps> = ({
  children,
  overrideBack,
  visible = true,
  style = {},
}) => {
  const handleBack = () => {
    if (!overrideBack) {
      RootNavigation.goBack();
    } else {
      RootNavigation.navigate(overrideBack.location, overrideBack.params);
    }
  };

  return (
    <ScrollView style={style}>
      {visible && (
        <TouchableOpacity style={styles.touchable} onPress={handleBack}>
          <MaterialCommunityIcons name="arrow-left" size={30} />
        </TouchableOpacity>
      )}
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  touchable: {
    width: '100%',
    paddingLeft: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
});

export default BackScreenComponent;
