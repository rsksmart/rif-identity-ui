import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Credential } from '../reducer';
import { typeStyles } from '../../../styles';
import StatusIcon from './StatusIcon';
import LoadingComponent from '../../../screens/Shared/LoadingComponent';
import JwtDataComponent from './JwtDataComponent';

interface QRDetailsComponentProps {
  credential: Credential | null;
  presentation: string;
  strings: any;
}

const QRDetailsComponent: React.FC<QRDetailsComponentProps> = ({ credential, presentation, strings }) => {
  if (!credential) {
    return <></>;
  }

  const qrCode = () => {
    if (!presentation) {
      return <LoadingComponent />
    }

    return presentation === 'ERROR'
      ? <Text>{strings.presentation_error}</Text> : <QRCode value={presentation} size={275} />
  }

  return (
    <View style={styles.view}>
      <Text style={typeStyles.header2}>
        {strings[credential.type.toLowerCase()]} <StatusIcon status="CERTIFIED" />
      </Text>
      <View style={styles.qrView}>{qrCode()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    alignItems: 'center',
    marginBottom: 10,
  },
  qrView: {
    marginTop: 20,
    marginBottom: 20,
  },
});

export default multilanguage(QRDetailsComponent);
