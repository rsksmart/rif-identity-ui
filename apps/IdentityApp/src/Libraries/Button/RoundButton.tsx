import React, { useContext }  from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet } from 'react-native';

import { ButtonInterface } from './interface';
import BaseButton from './BaseButton';

const RoundButton: React.FC<ButtonInterface> = ({ title, onPress, disabled }) => {
  const { colors }: ThemeInterface = useContext(ThemeContext);
  const Styles = StyleSheet.create({
    button: {
      alignItems: 'center',
      justifyContent: 'center',
      width: 80,
      height: 80,
      backgroundColor: '#ffffff',
      borderColor: colors.lightGray,
      borderWidth: 1,
      borderRadius: 40,
    },
    text: {
      fontSize: 34,
      color: colors.primary,
    },
  });

  return <BaseButton style={Styles} onPress={onPress} disabled={disabled} title={title} />;
};

export default RoundButton;
