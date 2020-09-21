import React, { useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

import { Credential } from '../reducer';
import StatusIcon from './StatusIcon';
import LoadingComponent from '../../../Libraries/Loading/LoadingComponent';

interface QRDetailsComponentProps {
  credential: Credential | null;
  presentationUri: string;
  strings: any;
  receivePresentationError: boolean;
}

const QRDetailsComponent: React.FC<QRDetailsComponentProps> = ({
  credential,
  presentationUri,
  receivePresentationError,
  strings,
}) => {
  const { typography }: ThemeInterface = useContext(ThemeContext);
  const qrCode = () => {
    if (receivePresentationError) {
      return <Text>{strings.presentation_error}</Text>
    }
    
    if (!presentationUri) {
      return <LoadingComponent />;
    }

    return <QRCode value={presentationUri} size={275} />
  };

  const type = credential ? credential.type.toLowerCase() : '';

  return (
    <View style={styles.view}>
      <Text style={typography.header2}>
        {strings[type]} <StatusIcon status="CERTIFIED" />
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
