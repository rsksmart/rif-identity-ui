import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as RootNavigation from '../../AppNavigation';

interface BackScreenComponentProps {
  children: React.ReactNode;
  visible?: boolean;
}

const BackScreenComponent: React.FC<BackScreenComponentProps> = ({ children, visible = true }) => {
  return (
    <View>
      {visible && (
        <TouchableOpacity style={styles.touchable} onPress={() => RootNavigation.goBack()}>
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
