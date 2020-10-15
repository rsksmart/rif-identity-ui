import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as RootNavigation from '../../AppNavigation';

interface BackScreenComponentProps {
  children: React.ReactNode;
  visible?: boolean;
  overrideBack?: {
    location: string;
    params?: {};
  };
}

const BackScreenComponent: React.FC<BackScreenComponentProps> = ({
  children,
  overrideBack,
  visible = true,
}) => {
  const handleBack = () => {
    if (!overrideBack) {
      RootNavigation.goBack();
    } else {
      RootNavigation.navigate(overrideBack.location, overrideBack.params);
    }
  };

  return (
    <View>
      {visible && (
        <TouchableOpacity style={styles.touchable} onPress={handleBack}>
          <MaterialCommunityIcons name="arrow-left" size={30} />
        </TouchableOpacity>
      )}
      {children}
    </View>
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
