import React, { useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Credential } from '../reducer';
import StatusIcon from './StatusIcon';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { CredentialTypes } from '../../../Providers/Issuers';

interface SingleSummaryComponentProps {
  credential: Credential;
  onPress: (action: string) => {};
  strings: any;
  disabled: boolean;
}

const SingleSummaryComponent: React.FC<SingleSummaryComponentProps> = ({
  strings,
  credential,
  onPress,
  disabled,
}) => {
  const { colors }: ThemeInterface = useContext(ThemeContext);
  const icon = () => {
    const color = disabled ? colors.lightGray : colors.primary;
    switch (credential.type) {
      case CredentialTypes.DRIVERS_LICENSE:
        return <FontAwesome name="automobile" color={color} size={30} />;
      case CredentialTypes.PARKING_PERMIT:
        return <FontAwesome5 name="parking" color={color} size={30} />;
      case CredentialTypes.ID:
        return <FontAwesome name="id-card-o" color={color} size={30} />;
      default:
        return <FontAwesome name="question" color={color} size={30} />;
    }
  };

  const showQR = credential.status === 'CERTIFIED';

  return (
    <View style={styles.credential}>
      <TouchableOpacity
        style={styles.detailsTouch}
        onPress={() => onPress('DETAILS')}
        disabled={disabled}>
        {icon()}
        <Text style={[styles.name, disabled ? styles.disabled : {}]}>
          {strings[credential.type.toLowerCase()]}
        </Text>
        <Text style={disabled ? styles.disabled : {}}>{credential.hash.substr(0, 8)}</Text>
        <StatusIcon status={credential.status} />
      </TouchableOpacity>
      <View style={styles.qr}>
        <TouchableOpacity
          disabled={!showQR || disabled}
          style={styles.qrTouch}
          onPress={() => onPress('QR')}>
          <FontAwesome name="qrcode" size={30} color={showQR ? '#50555C' : '#CCCCCC'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  credential: {
    borderWidth: 1,
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 10,
  },
  detailsTouch: {
    alignItems: 'center',
  },
  name: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  qrTouch: {
    width: '100%',
    alignItems: 'center',
  },
  qr: {
    width: '100%',
    borderTopWidth: 1,
    marginTop: 10,
    paddingTop: 10,
  },
  disabled: {
    color: '#e1e1e1',
  },
});

export default multilanguage(SingleSummaryComponent);
