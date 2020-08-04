import React, { useState, useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { View, Text, StyleSheet } from 'react-native';
import ModalComponent from '../../Libraries/Modal/ModalComponent';
import { SquareButton } from '../../Libraries/Button';

interface ChangeLangaugeModalProps {
  strings: any;
  selectedLanguage: string;
  changeLanguage: (language: string) => {};
  languages: string[],
}

const ChangeLangaugeModal: React.FC<ChangeLangaugeModalProps> = ({
  strings,
  selectedLanguage,
  changeLanguage,
  languages,
}) => {
  const [languageModalVisible, setLanguageModalVisible] = useState(false);

  const selectLanguage = (language: string) => {
    setLanguageModalVisible(false);
    changeLanguage(language);
  };
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  return (
    <>
      <SquareButton
        title={strings.change_language}
        onPress={() => setLanguageModalVisible(true)}
        variation="hollow"
      />
      <ModalComponent visible={languageModalVisible}>
        <View style={layout.column1}>
          <Text style={typography.paragraph}>{strings.change_language}:</Text>
          {languages.map(key => (
            <View style={styles.buttonContainer} key={key}>
              <SquareButton
                title={strings[key]}
                variation={selectedLanguage === key ? 'solid' : 'hollow'}
                onPress={() => selectLanguage(key)}
              />
            </View>
          ))}
        </View>
      </ModalComponent>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginBottom: 10,
  },
});

export default multilanguage(ChangeLangaugeModal);
