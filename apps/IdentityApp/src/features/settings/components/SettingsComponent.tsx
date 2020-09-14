import React, { useContext, useState } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, View, Text, GestureResponderEvent } from 'react-native';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import { SquareButton } from '../../../Libraries/Button';
import ChangeLangaugeModalContainer from '../../../Libraries/ChangeLanguage/ChangeLangaugeModalContainer';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';
import { CopyButton } from '../../../Libraries/CopyButton';

interface SettingsComponentProps {
  strings: any;
  did: string | null;
  navigation: any;
  getMnemonic: () => {
    mnemonic: string;
  };
}

const SettingsComponent: React.FC<SettingsComponentProps> = ({ strings, did, navigation, getMnemonic }) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [mnemonic, setMnemonic] = useState<string | null>(null);

  const showMnemonic = async () => {
    const storageMnemonic = await getMnemonic();
    setMnemonic(storageMnemonic.mnemonic);
  };

  return (
    <BackScreenComponent>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.header1}>{strings.settings}</Text>
          {did && (
            <>
              <Text style={typography.paragraphBold}>{strings.identity}</Text>
              <CopyButton value={did} />
            </>
          )}

          {did && (
            <View style={styles.buttonView}>
              <SquareButton
                title={strings.show_security_words}
                variation="hollow"
                onPress={showMnemonic}
              />
              <ModalComponent visible={mnemonic !== null}>
                <Text style={typography.paragraphBold}>{strings.security_words_write_down}</Text>
                <Text style={[typography.paragraph, styles.mnemonic]}>{mnemonic}</Text>
                <SquareButton
                  title={strings.close}
                  variation="hollow"
                  onPress={() => setMnemonic(null)}
                />
              </ModalComponent>
            </View>
          )}

          <View style={styles.buttonView}>
            <ChangeLangaugeModalContainer />
          </View>
          <View style={styles.buttonView}>
            <SquareButton
              title={strings.advanced_settings}
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
