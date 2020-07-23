import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { layoutStyles, typeStyles } from '../../styles';
import { RoundButton, SquareButton } from '../Button';

interface PinButtonsProps {
  onSubmit: (pin: string) => {};
  hidePin: boolean;
  maxDigits: number;
}

const PinButtons: React.FC<PinButtonsProps> = ({ onSubmit, hidePin, maxDigits }) => {
  const [sequence, setSequence] = useState([]);

  // add or remove item from the sequence by not mutating the state.
  const onPress = (digit: number | 'x') => {
    if (digit !== 'x' && sequence.length >= maxDigits) {
      return;
    }

    const newSequence =
      digit === 'x' ? sequence.slice(0, sequence.length - 1) : [...sequence, digit];

    setSequence(newSequence);
  };

  const handleSubmit = () => {
    onSubmit(sequence.join(''));
    setSequence([]);
  };

  return (
    <>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <Text style={[typeStyles.header1, styles.userInput]}>
            {hidePin ? [...Array(sequence.length)].map(() => '* ') : sequence.join(' ')}
          </Text>
        </View>
      </View>
      <View style={layoutStyles.row}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(digit => {
          const zeroStyle = digit === 0 ? [styles.zeroContainer] : [];
          return (
            <View style={[layoutStyles.column3, styles.numberContainer, zeroStyle]} key={digit}>
              <RoundButton title={digit.toString()} onPress={() => onPress(digit)} />
            </View>
          );
        })}
        {sequence.length !== 0 && (
          <View style={layoutStyles.column3}>
            <RoundButton title="X" onPress={() => onPress('x')} />
          </View>
        )}
      </View>

      <View style={layoutStyles.row}>
        <View style={[layoutStyles.column1, styles.buttonRow]}>
          <SquareButton title="Next" onPress={handleSubmit} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  userInput: {
    textAlign: 'center',
  },
  numberContainer: {
    marginBottom: 15,
  },
  zeroContainer: {
    marginLeft: '33%',
  },
  buttonRow: {
    marginTop: 20,
  },
});

export default PinButtons;
