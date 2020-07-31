import React, { useState } from 'react';
import {
  Text, View, TextInput, TouchableOpacity, StyleSheet,
} from 'react-native';
import { layoutStyles, typeStyles, colors } from '../../styles/';
import { multilanguage } from 'redux-multilanguage';
import Button from '../../shared/Button'
import { RNCamera } from 'react-native-camera';
import BarcodeMask from 'react-native-barcode-mask';
import LoadingComponent from '../shared/LoadingComponent';

interface ScanQRProps {
  strings: any;
  handleScan: (jwt: string, navigation: any) => void | null;
  navigation: any;
  isVerifying: boolean;
  allowScanAgain: boolean;
}

const ScanQRComponent: React.FC<ScanQRProps> = ({
  strings, handleScan, navigation, isVerifying, allowScanAgain
}) => {
  const [isScanFinished, setIsScanFinished] = useState(false)

  const onBarCodeRead = (scanResult: any) => {
    const { data } = scanResult;
    if (isScanFinished && !allowScanAgain) {
      return;
    }
    setIsScanFinished(true)
    console.log(`scanResult: ${JSON.stringify(scanResult)}`);
    handleScan(data, navigation);
  }

  const styles = StyleSheet.create({
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 10
    },
    body: {
      flex: 1,
      backgroundColor: 'white',
    },
  })

  if (isVerifying) {
    return <LoadingComponent />
  }

  return (
    <View style={styles.body}>
      <View style={layoutStyles.container}>
        <Text style={typeStyles.header1}>{strings.verify_credentials}</Text>
        <Text style={typeStyles.header2}>{strings.scan_citizen_qr}</Text>
      </View>
      <RNCamera
        captureAudio={false}
        style={styles.preview}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        barCodeTypes={[RNCamera.Constants.BarCodeType.qr]}
        androidCameraPermissionOptions={{
          title: strings.camera_permission_title,
          message: strings.camera_permission_message,
          buttonPositive: strings.ok,
          buttonNegative: strings.cancel,
        }}
        onBarCodeRead={onBarCodeRead}
      >
        {({ status }) => {
          if (status === 'PENDING_AUTHORIZATION') {
            return <Text>PENDING_AUTHORIZATION AUTH</Text>;
          }
          if (status === 'NOT_AUTHORIZED') {
            return <Text>NOT_AUTHORIZED AUTH</Text>;
          }
          return <BarcodeMask width={250} height={250} edgeBorderWidth={1} showAnimatedLine={false} />;
        }}
      </RNCamera>
    </View>
  );
};


export default multilanguage(ScanQRComponent);
