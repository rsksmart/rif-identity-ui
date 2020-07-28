import React, { useState } from 'react';
import { multilanguage } from 'redux-multilanguage';
import { View, Text, StyleSheet } from 'react-native';
import ModalComponent from '../../Libraries/Modal/ModalComponent';
import { SquareButton } from '../../Libraries/Button';
import { typeStyles, layoutStyles } from '../../styles';

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

  return (
    <>
      <SquareButton
        title={strings.change_language}
        onPress={() => setLanguageModalVisible(true)}
        variation="hollow"
      />
      <ModalComponent visible={languageModalVisible}>
        <View style={layoutStyles.column1}>
          <Text style={typeStyles.paragraph}>{strings.change_language}:</Text>
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
