import React, { useContext, useState } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, View, Text, GestureResponderEvent } from 'react-native';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import { SquareButton } from '../../../Libraries/Button';
import ChangeLangaugeModalContainer from '../../../Libraries/ChangeLanguage/ChangeLangaugeModalContainer';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';

interface SettingsComponentProps {
  strings: any;
  startOverPress: (event: GestureResponderEvent) => void | null;
  reverify: (event: GestureResponderEvent) => void | null;
  did: string;
  mnemonic: string[];
  navigation: any;
}

const SettingsComponent: React.FC<SettingsComponentProps> = ({
  strings,
  did,
  mnemonic,
  navigation,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [showWords, setShowWords] = useState<boolean>(false);
  return (
    <BackScreenComponent>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.header1}>{strings.settings}</Text>
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
          <View style={styles.buttonView}>
            <SquareButton
              title="Advanced Settings"
              variation="hollow"
              onPress={() => navigation.navigate('Advanced')}
            />
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
