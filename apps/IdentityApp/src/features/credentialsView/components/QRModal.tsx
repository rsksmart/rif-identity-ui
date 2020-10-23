import React, { useState } from 'react';
import { multilanguage } from 'redux-multilanguage';
import { LayoutChangeEvent, StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { SquareButton } from '../../../Libraries/Button';
import LoadingComponent from '../../../Libraries/Loading/LoadingComponent';
import MessageComponent from '../../../Libraries/Message/MessageComponent';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';

interface QRModalProps {
  showQr: boolean;
  qrModalHash: string | null;
  qrError: string | null;
  onClose: () => void;
  strings: any;
}

const QRModal: React.FC<QRModalProps> = ({ showQr, qrModalHash, qrError, onClose, strings }) => {
  const [width, setWidth] = useState(255);
  return (
    <ModalComponent visible={showQr}>
      <View
        onLayout={(event: LayoutChangeEvent) => {
          setWidth(event.nativeEvent.layout.width);
        }}
        style={styles.modalQr}>
        {!qrModalHash && !qrError && <LoadingComponent />}
        {qrModalHash && <QRCode value={qrModalHash} size={width} />}
        {qrError && <MessageComponent message={qrError} type="ERROR" />}
        <View style={styles.button}>
          <SquareButton title={strings.close} variation="hollow" onPress={onClose} />
        </View>
      </View>
    </ModalComponent>
  );
};

const styles = StyleSheet.create({
  modalQr: {
    width: '100%',
  },
  button: {
    marginTop: 20,
  },
});

export default multilanguage(QRModal);
