import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Credential } from '../reducer';
import { typeStyles } from '../../../styles';
import StatusIcon from './StatusIcon';

interface QRDetailsComponentProps {
  credential: Credential | null;
}

const QRDetailsComponent: React.FC<QRDetailsComponentProps> = ({ credential }) => {
  if (!credential) {
    return <></>;
  }

  return (
    <View style={styles.view}>
      <Text style={typeStyles.header2}>
        {credential.name} <StatusIcon status="CERTIFIED" />
      </Text>
      <View style={styles.qrView}>
        <QRCode value={credential.name} size={200} />
      </View>
      <Text>credential data</Text>
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

export default QRDetailsComponent;
