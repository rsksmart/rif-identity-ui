import React, { useState } from 'react';
import {
  Text, View, TextInput, StyleSheet,
} from 'react-native';
import { layoutStyles, typeStyles } from '../../styles/';
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
  const [jwt, setJwt] = useState('')

  const handleChangeJwt = (jwt: string) => setJwt(jwt)
  
  const handleVerifyPress = () => handleScan(jwt, navigation)

  const onBarCodeRead = (scanResult: any) => {
    const { data } = scanResult;
    if (isScanFinished && !allowScanAgain) {
      return;
    }
    setIsScanFinished(true)

    handleScan(data, navigation);
  }

  const styles = StyleSheet.create({
    preview: {
      flex: 1,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginTop: 30
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
      {/* Leave this comment for testing purposes, the scanner does not work in the simulators */}
      {/* <View>
        <Text style={typeStyles.paragraph}>{strings.enter_jwt}</Text>
        <TextInput
          onChangeText={text => handleChangeJwt(text)}
          value={jwt}
          editable
        />
      </View>
      <Button title={strings.verify_jwt} onPress={handleVerifyPress} /> */}
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
