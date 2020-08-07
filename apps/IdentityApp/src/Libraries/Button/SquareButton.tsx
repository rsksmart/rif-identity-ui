import React from 'react';
import {StyleSheet} from 'react-native';
import BaseButton from './BaseButton';
import {ButtonInterface} from './interface';

interface SquareButtonInterface extends ButtonInterface {
  variation?: 'hollow' | 'solid';
}

const SquareButton: React.FC<SquareButtonInterface> = ({
  disabled,
  title,
  onPress,
  variation,
}) => {
  let style;
  if (variation === 'hollow') {
    style = disabled ? hollowStylesDisabled : hollowStyles;
  } else {
    style = disabled ? solidStylesDisabled : solidStyles;
  }

  return (
    <BaseButton
      onPress={onPress}
      style={style}
      title={title}
      disabled={disabled}
    />
  );
};

const sharedStyles = {
  button: {
    width: '100%',
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
  },
  text: {
    width: '100%',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
};

const solidStyles = StyleSheet.create({
  button: {
    ...sharedStyles.button,
    backgroundColor: '#50555C',
    borderWidth: 0,
  },
  text: {
    ...sharedStyles.text,
    color: '#FFFFFF',
  },
});

const solidStylesDisabled = StyleSheet.create({
  ...solidStyles,
  button: {
    ...solidStyles.button,
    backgroundColor: '#CCCCCC',
    borderColor: '#CCCCCC',
  },
});

const hollowStyles = StyleSheet.create({
  button: {
    ...sharedStyles.button,
    backgroundColor: '#FFFFFF',
    borderColor: '#000',
  },
  text: {
    ...sharedStyles.text,
    color: '#000',
  },
});

const hollowStylesDisabled = StyleSheet.create({
  button: {
    ...sharedStyles.button,
    backgroundColor: '#FFFFFF',
    borderColor: '#ccc',
  },
  text: {
    ...sharedStyles.text,
    color: '#ccc',
  },
});

export default SquareButton;
