import React, { useContext, useState, useEffect } from 'react';
import { multilanguage } from 'redux-multilanguage';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, View, Text } from 'react-native';

import { SquareButton } from '../../../Libraries/Button';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';
import LoadingComponent from '../../../Libraries/Loading/LoadingComponent';

interface ViewMnemonicComponentProps {
  onSubmit: (mnemonic: string[]) => void | null;
  newMnemonic: () => string[];
  strings: any;
}

const ViewMnemonicComponent: React.FC<ViewMnemonicComponentProps> = ({
  onSubmit,
  newMnemonic,
  strings,
}) => {
  const [popup, setPopup] = useState<boolean>(false);
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);

  useEffect(() => {
    setMnemonic(newMnemonic());
  }, [newMnemonic]);

  const handleSubmit = () => {
    setPopup(false);
    onSubmit(mnemonic);
  };

  if (mnemonic?.length === 0) {
    return <LoadingComponent />;
  }

  return (
    <BackScreenComponent overrideBack={{ location: 'CredentialsFlow' }}>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.header1}>{strings.security_words}</Text>
          <Text style={typography.paragraph}>{strings.security_words_explanation}</Text>
          <Text style={typography.paragraphBold}>{strings.security_words_write_down}</Text>
        </View>
        <View style={[layout.row, layout.borderRow, styles.wordRow]}>
          {mnemonic.map((word, index) => (
            <View style={layout.column2} key={word}>
              <Text
                style={[
                  typography.paragraph,
                  styles.singleWord,
                  index % 2 === 0 ? styles.alignRight : styles.alignLeft,
                ]}>
                {word}
              </Text>
            </View>
          ))}
        </View>
      </View>
      <View style={layout.row}>
        <View style={layout.column1}>
          <SquareButton title={strings.next} onPress={() => setPopup(true)} />
        </View>
      </View>

      <ModalComponent visible={popup}>
        <View>
          <Text style={[typography.header2, styles.alignCenter]}>{strings.made_secure_copy}</Text>
          <Text style={[typography.paragraphBold, styles.alignCenter]}>
            {strings.you_will_need}
          </Text>
          <View style={styles.buttonContainer}>
            <SquareButton title={strings.no} variation="hollow" onPress={() => setPopup(false)} />
          </View>
          <View style={styles.buttonContainer}>
            <SquareButton title={strings.yes} onPress={handleSubmit} />
          </View>
        </View>
      </ModalComponent>
    </BackScreenComponent>
  );
};

const styles = StyleSheet.create({
  wordRow: {
    margin: 10,
    padding: 10,
    borderWidth: 1,
  },
  innerRow: {
    marginTop: 10,
    marginBottom: 10,
    alignContent: 'center',
  },
  singleWord: {
    textAlign: 'center',
    width: '100%',
    marginTop: 0,
    marginBottom: 0,
    fontSize: 23,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 10,
  },
  alignRight: {
    textAlign: 'right',
  },
  alignLeft: {
    textAlign: 'left',
  },
  alignCenter: {
    textAlign: 'center',
  },
});

export default multilanguage(ViewMnemonicComponent);
