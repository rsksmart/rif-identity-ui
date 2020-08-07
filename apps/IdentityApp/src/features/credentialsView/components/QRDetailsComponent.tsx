import React, { useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Credential } from '../reducer';
import StatusIcon from './StatusIcon';
import LoadingComponent from '../../../screens/Shared/LoadingComponent';

interface QRDetailsComponentProps {
  credential: Credential | null;
  presentationUrl: string;
  presentationPwd: string;
  presentationHash: string;
  strings: any;
}

const QRDetailsComponent: React.FC<QRDetailsComponentProps> = ({
  credential,
  presentationUrl,
  presentationPwd,
  presentationHash,
  strings,
}) => {
  const { typography }: ThemeInterface = useContext(ThemeContext);
  const qrCode = () => {
    if (!presentationUrl || !credential) {
      return <LoadingComponent />;
    }

    if (presentationUrl === 'ERROR') {
      return <Text>{strings.presentation_error}</Text>
    }

    const presentationQrValue = {
      url: presentationUrl,
      pwd: presentationPwd,
      vpHash: presentationHash
    }

    return <QRCode value={JSON.stringify(presentationQrValue)} size={275} />
  };

  const type = credential ? credential.type.toLowerCase() : '';
  const hash = credential ? credential.hash.substr(0, 8) : '';

  return (
    <View style={styles.view}>
      <Text style={typography.header2}>
        {strings[type]} <StatusIcon status="CERTIFIED" />
      </Text>
      <View style={styles.qrView}>{qrCode()}</View>
      <Text>{hash}</Text>
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
