import React from 'react';
import {
  TouchableOpacity,
  View,
  Text,
  GestureResponderEvent,
  StyleSheet,
} from 'react-native';
import { colors } from '../styles';


const styles = StyleSheet.create({
  button: {
    margin: 9,
    alignItems: 'center',
    justifyContent: 'center',
    width: 311,
    height: 50,
    borderColor: colors.darkestGray,
    borderWidth: 2,
    borderStyle: 'solid',
    // box-sizing: 'border-box',
    borderRadius: 6, 
  },
  text: {
    textTransform: 'uppercase',
    lineHeight: 15,
    textAlign: 'center',
    display: 'flex',
    fontSize: 13,
    color: colors.darkestGray,
    letterSpacing: 0.04,
    fontWeight: '900'
  },
});

interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void | null;
}

const BaseButton: React.FC<ButtonProps> = ({
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BaseButton;
