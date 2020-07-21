import React from 'react';
import {
  Text,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';

const ScanQRComponent: React.FC<{}> = () => {
  return (
    <Text>Scan QR component</Text>
  );
};

export default multilanguage(ScanQRComponent);
