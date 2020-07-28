import React, { useContext }  from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, View, Text, GestureResponderEvent } from 'react-native';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
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
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  return (
    <BackScreenComponent>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.header1}>{strings.settings}</Text>
          <Text style={typography.paragraph}>APK version: {version}</Text>

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
