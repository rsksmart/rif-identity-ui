import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import {StyleSheet, View, Text} from 'react-native';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import { layoutStyles, typeStyles } from '../../../styles';
import { SquareButton } from '../../../Libraries/Button';

interface SettingsComponentProps {
  strings: any;
  version: string;
  startOverPress: (event: GestureResponderEvent) => void | null;
}

const SettingsComponent: React.FC<SettingsComponentProps> = ({ strings, version, startOverPress }) => {
  return (
    <BackScreenComponent>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <Text style={typeStyles.header1}>{strings.settings}</Text>
          <Text style={typeStyles.paragraph}>APK version: {version}</Text>
          <View>
            <SquareButton title="Reset entire App" variation="hollow" onPress={startOverPress} />
          </View>
        </View>
      </View>
    </BackScreenComponent>    
  );
};

const styles = StyleSheet.create({});

export default multilanguage(SettingsComponent);
