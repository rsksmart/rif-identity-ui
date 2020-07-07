import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {SquareButton} from '../../../../Libraries/Button';

import {layoutStyles, typeStyles} from '../../../../styles';

interface ConfirmMnemonicComponentProps {
  words: string[];
  isError: string | null;
  onSubmit: Function;
  start: Function;
}

const ConfirmMnemonicComponent: React.FC<ConfirmMnemonicComponentProps> = ({
  words,
  isError,
  onSubmit,
  start,
}) => {
  const [wordList, setWordList] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);

  // is the word found in the selected list?
  const isFound = (word: string) => selectedWords.find((item) => item === word);

  // "randomize" the words for the user
  useEffect(() => {
    const randomList = [...words].sort(() => 0.5 - Math.random());
    setWordList(randomList);
    start(); // clears the error state
  }, [words]);

  // add or remove the item from the selected list
  const toggleClick = (word: string) => {
    const newSelected = !isFound(word)
      ? [...selectedWords, word]
      : selectedWords.filter((item) => item !== word);
    setSelectedWords(newSelected);
  };

  return (
    <>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <Text style={typeStyles.paragraph}>
            Select the words in order to confirm you know them.
          </Text>
        </View>
      </View>
      <View style={layoutStyles.row}>
        {wordList.map((word) => (
          <View
            style={{...layoutStyles.column3, ...styles.buttonColumn}}
            key={word}>
            <SquareButton
              title={word}
              variation={isFound(word) ? 'solid' : 'hollow'}
              onPress={() => toggleClick(word)}
            />
          </View>
        ))}
      </View>

      {isError && <Text style={typeStyles.error}>{isError}</Text>}

      <View style={layoutStyles.row}>
        <View style={{...layoutStyles.borderRow, ...styles.wordList}}>
          <Text style={typeStyles.paragraph}>{selectedWords.join(', ')}</Text>
        </View>
      </View>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <SquareButton
            title="Next"
            disabled={selectedWords.length !== words.length}
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
