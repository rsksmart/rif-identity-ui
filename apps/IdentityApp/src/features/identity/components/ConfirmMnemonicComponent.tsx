import React, { useState, useEffect, useContext } from 'react';
import { multilanguage } from 'redux-multilanguage';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, View, Text } from 'react-native';
import { SquareButton } from '../../../Libraries/Button';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import MessageComponent from '../../../Libraries/Message/MessageComponent';
import LoadingComponent from '../../../Libraries/Loading/LoadingComponent';

interface ConfirmMnemonicComponentProps {
  mnemonic: string[];
  onSubmit: (words: string[]) => {};
  strings: any;
}

const ConfirmMnemonicComponent: React.FC<ConfirmMnemonicComponentProps> = ({
  mnemonic,
  onSubmit,
  strings,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [wordList, setWordList] = useState([]);
  const [selectedWords, setSelectedWords] = useState([]);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const isFound = (word: string) => selectedWords.find(item => item === word);

  useEffect(() => {
    const randomList = [...mnemonic].sort(() => 0.5 - Math.random());
    setWordList(randomList);
  }, [mnemonic]);

  const toggleClick = (word: string) => {
    setIsError(false);
    const newSelected = !isFound(word)
      ? [...selectedWords, word]
      : selectedWords.filter(item => item !== word);
    setSelectedWords(newSelected);
  };

  const handleSubmit = () => {
    setIsError(false);
    if (selectedWords.every((val, index) => val === mnemonic[index])) {
      setIsSaving(true);
      onSubmit(selectedWords);
    } else {
      setIsError(true);
    }
  };

  if (isSaving) {
    return <LoadingComponent />;
  }

  return (
    <BackScreenComponent>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.header1}>{strings.confirm_security_words}</Text>
          <Text style={typography.paragraph}>{strings.reenter_words}</Text>
        </View>
      </View>

      <View style={layout.row}>
        <View style={layout.column1}>
          <View style={[layout.borderRow, styles.wordList]}>
            <Text style={typography.paragraph}>{selectedWords.join(', ')}</Text>
          </View>
        </View>
      </View>

      <View style={layout.row}>
        {wordList.map(word => (
          <View style={[layout.column2, styles.buttonColumn]} key={word}>
            <SquareButton
              title={word}
              variation={isFound(word) ? 'solid' : 'hollow'}
              onPress={() => toggleClick(word)}
            />
          </View>
        ))}
      </View>

      {isError && <MessageComponent type="ERROR" message={strings.word_order_error} />}

      <View style={layout.row}>
        <View style={layout.column1}>
          <SquareButton
            title={strings.next}
            disabled={selectedWords.length !== mnemonic.length}
            onPress={handleSubmit}
          />
        </View>
      </View>
    </BackScreenComponent>
  );
};

const styles = StyleSheet.create({
  buttonColumn: {
    marginBottom: 10,
  },
  wordList: {
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 15,
  },
});

export default multilanguage(ConfirmMnemonicComponent);
