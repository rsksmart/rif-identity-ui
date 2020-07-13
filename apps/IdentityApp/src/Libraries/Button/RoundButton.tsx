import React from 'react'
import {StyleSheet} from 'react-native';
import colors from '../../styles/colors';

import {ButtonInterface} from './interface';
import BaseButton from './BaseButton';

const RoundButton: React.FC<ButtonInterface> = ({title, onPress, disabled}) => {
  return (
    <BaseButton
      style={Styles}
      onPress={onPress}
      disabled={disabled}
      title={title}
    />
  );
};

const Styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: colors.lightGray,
    borderRadius: 40,
  },
  text: {
    fontSize: 34,
    color: colors.black,
  },
});

export default RoundButton;
