import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  GestureResponderEvent,
} from 'react-native';

import {layoutStyles, typeStyles} from '../../../styles';
import {SquareButton} from '../../../Libraries/Button';

interface CredentialsHomeComponentProps {
  startOverPress: (event: GestureResponderEvent) => void | null;
}

const CredentialsHomeComponent: React.FC<CredentialsHomeComponentProps> = ({
  startOverPress,
  state,
}) => {
  console.log(state);
  return (
    <View style={{...layoutStyles.row, ...styles.container}}>
      <View style={{...layoutStyles.column1, ...styles.default}}>
        <Text style={typeStyles.header1}>Credentials</Text>
        <Text style={typeStyles.header2}>High Five!</Text>
        <Image source={require('../../../assets/images/high-five.png')} />
      </View>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <SquareButton title="Start Over" onPress={startOverPress} />
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

export default CredentialsHomeComponent;
