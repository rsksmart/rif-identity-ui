import React, { useState, useEffect, useContext }  from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import {StyleSheet, View, Text} from 'react-native';
import {SquareButton} from '../../../Libraries/Button';

interface ConfirmMnemonicComponentProps {
  mnemonic: string[];
  isError: string | null;
  onSubmit: Function;
  start: Function;
}

const ConfirmMnemonicComponent: React.FC<ConfirmMnemonicComponentProps> = ({
  mnemonic,
  isError,
  onSubmit,
  start,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [wordList, setWordList] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);

  // is the word found in the selected list?
  const isFound = (word: string) => selectedWords.find((item) => item === word);

  // "randomize" the words for the user
  useEffect(() => {
    const randomList = [...mnemonic].sort(() => 0.5 - Math.random());
    setWordList(randomList);
    start(); // clears the error state
  }, [mnemonic]);

  // add or remove the item from the selected list
  const toggleClick = (word: string) => {
    const newSelected = !isFound(word)
      ? [...selectedWords, word]
      : selectedWords.filter((item) => item !== word);
    setSelectedWords(newSelected);
  };

  return (
    <>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.paragraph}>
            Select the words in order to confirm you know them.
          </Text>
        </View>
      </View>
      <View style={layout.row}>
        {wordList.map((word) => (
          <View
            style={[ layout.column3, styles.buttonColumn]}
            key={word}>
            <SquareButton
              title={word}
              variation={isFound(word) ? 'solid' : 'hollow'}
              onPress={() => toggleClick(word)}
            />
          </View>
        ))}
      </View>

      {isError && <Text style={typography.error}>{isError}</Text>}

      <View style={layout.row}>
        <View style={[ layout.borderRow, styles.wordList ]}>
          <Text style={typography.paragraph}>{selectedWords.join(', ')}</Text>
        </View>
      </View>
      <View style={layout.row}>
        <View style={layout.column1}>
          <SquareButton
            title="Next"
            disabled={selectedWords.length !== mnemonic.length}
            onPress={() => onSubmit(selectedWords)}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  buttonColumn: {
    marginBottom: 10,
  },
  wordList: {
    width: '90%',
    margin: '5%',
    paddingLeft: 15,
    paddingRight: 15,
  },
});

export default ConfirmMnemonicComponent;
