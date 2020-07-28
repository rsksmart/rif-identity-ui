import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, View, Text } from 'react-native';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import { layoutStyles, typeStyles } from '../../../styles';
import { SquareButton } from '../../../Libraries/Button';
import ChangeLangaugeModalContainer from '../../../screens/Shared/ChangeLangaugeModalContainer';

interface SettingsComponentProps {
  strings: any;
  version: string;
  startOverPress: (event: GestureResponderEvent) => void | null;
  reverify: (event: GestureResponderEvent) => void | null;
}

const SettingsComponent: React.FC<SettingsComponentProps> = ({
  strings,
  version,
  startOverPress,
  reverify,
}) => {
  return (
    <BackScreenComponent>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <Text style={typeStyles.header1}>{strings.settings}</Text>
          <Text style={typeStyles.paragraph}>APK version: {version}</Text>

          <View style={styles.buttonView}>
            <SquareButton title="Reverify All Credentials" variation="hollow" onPress={reverify} />
          </View>

          <View style={styles.buttonView}>
            <SquareButton title="Reset entire App" variation="hollow" onPress={startOverPress} />
          </View>

          <View style={styles.buttonView}>
            <ChangeLangaugeModalContainer />
          </View>
        </View>
      </View>
    </BackScreenComponent>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    marginBottom: 15,
  },
});

export default multilanguage(SettingsComponent);
