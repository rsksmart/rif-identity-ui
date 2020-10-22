import React, { useState, useContext } from 'react';
import { multilanguage } from 'redux-multilanguage';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, View, Text } from 'react-native';

import { RoundButton, SquareButton } from '../Button';

interface PinButtonsProps {
  onSubmit: (pin: string) => {};
  hidePin: boolean;
  maxDigits: number;
  strings: any;
}

const PinButtons: React.FC<PinButtonsProps> = ({ onSubmit, hidePin, maxDigits, strings }) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
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
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={[typography.header1, styles.userInput]}>
            {hidePin ? [...Array(sequence.length)].map(() => '* ') : sequence.join(' ')}
          </Text>
        </View>
      </View>
      <View style={layout.row}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(digit => {
          const zeroStyle = digit === 0 ? [styles.zeroContainer] : [];
          return (
            <View style={[layout.column3, styles.numberContainer, zeroStyle]} key={digit}>
              <RoundButton title={digit.toString()} onPress={() => onPress(digit)} />
            </View>
          );
        })}
        {sequence.length !== 0 && (
          <View style={layout.column3}>
            <RoundButton title="X" onPress={() => onPress('x')} />
          </View>
        )}
      </View>

      <View style={layout.row}>
        <View style={[layout.column1, styles.buttonRow]}>
          <SquareButton title={strings.next} onPress={handleSubmit} />
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

export default multilanguage(PinButtons);
