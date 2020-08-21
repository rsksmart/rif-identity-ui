import React, { useContext, useState } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, View, Text, GestureResponderEvent } from 'react-native';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import { SquareButton } from '../../../Libraries/Button';
import ChangeLangaugeModalContainer from '../../../Libraries/ChangeLanguage/ChangeLangaugeModalContainer';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';
import { ISSUER_ENDPOINT } from '@env';

interface SettingsComponentProps {
  strings: any;
  version: string;
  startOverPress: (event: GestureResponderEvent) => void | null;
  reverify: (event: GestureResponderEvent) => void | null;
  did: string;
  mnemonic: string[];
}

const SettingsComponent: React.FC<SettingsComponentProps> = ({
  strings,
  version,
  startOverPress,
  reverify,
  did,
  mnemonic,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [showWords, setShowWords] = useState<boolean>(false);
  return (
    <BackScreenComponent>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.header1}>{strings.settings}</Text>
          <Text style={typography.paragraphBold}>APK version:</Text>
          <Text>{version}</Text>
          <Text style={typography.paragraphBold}>{strings.identity}</Text>
          <Text>{did}</Text>

          {mnemonic && (
            <View style={styles.buttonView}>
              <SquareButton
                title={strings.show_security_words}
                variation="hollow"
                onPress={() => setShowWords(true)}
              />
              <ModalComponent visible={showWords}>
                <Text style={typography.paragraphBold}>{strings.security_words_write_down}</Text>
                <Text style={[typography.paragraph, styles.mnemonic]}>{mnemonic.join(', ')}</Text>
                <SquareButton
                  title={strings.close}
                  variation="hollow"
                  onPress={() => setShowWords(false)}
                />
              </ModalComponent>
            </View>
          )}

          <View style={styles.buttonView}>
            <ChangeLangaugeModalContainer />
          </View>

          <Text style={typography.header2}>Developer Zone:</Text>
          <View style={styles.buttonView}>
            <SquareButton title="Reset entire App" variation="hollow" onPress={startOverPress} />
          </View>

          <View style={styles.buttonView}>
            <SquareButton title="Reverify All Credentials" variation="hollow" onPress={reverify} />
          </View>
        </View>
      </View>
    </BackScreenComponent>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    marginTop: 15,
    marginBottom: 0,
  },
  mnemonic: {
    margin: 10,
  },
});

export default multilanguage(SettingsComponent);
