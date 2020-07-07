import React from 'react';
import {TouchableOpacity, View, Text, GestureResponderEvent} from 'react-native';

interface Style {
  button: Object;
  text: Object;
}

interface BaseButtonProps {
  title: string;
  style: Style;
  onPress?: (event: GestureResponderEvent) => void | null;
  disabled?: boolean;
}

const BaseButton: React.FC<BaseButtonProps> = ({
  title,
  style,
  onPress,
  disabled,
}) => {
  return (
    <TouchableOpacity
      style={style.button}
      onPress={onPress}
      disabled={disabled}>
      <View>
        <Text style={style.text}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BaseButton;
