import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  GestureResponderEvent,
} from 'react-native';
import {multilanguage} from 'redux-multilanguage';

import {layoutStyles, typeStyles} from '../../../styles';
import {SquareButton} from '../../../Libraries/Button';

interface CredentialsHomeComponentProps {
  startOverPress: (event: GestureResponderEvent) => void | null;
  version: string,
  strings: any,
}

const CredentialsHomeComponent: React.FC<CredentialsHomeComponentProps> = ({
  startOverPress, version, strings,
}) => {
  return (
    <View style={{...layoutStyles.row, ...styles.container}}>
      <View style={{...layoutStyles.column1, ...styles.default}}>
        <Text style={typeStyles.header1}>{strings.credentials}</Text>
        <Text style={typeStyles.header2}>High Five!</Text>
        <Image source={require('../../../assets/images/high-five.png')} />
        <Text style={{...typeStyles.paragraph, textAlign: 'center'}}>
          Close this app completly and relaunch it. You should be asked for your pin.
        </Text>
        <Text>version: {version}</Text>
      </View>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <SquareButton title="Clear Persistant Storage and Start Over" onPress={startOverPress} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  default: {
    alignItems: 'center',
  },
});

export default multilanguage(CredentialsHomeComponent);
