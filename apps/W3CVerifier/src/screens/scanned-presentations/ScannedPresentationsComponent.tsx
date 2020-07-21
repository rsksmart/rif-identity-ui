import React from 'react';
import {
  Text,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';

const ScannedPresentationsComponent: React.FC<{}> = () => {
  return (
    <Text>Scanned presentations list</Text>
  );
};

export default multilanguage(ScannedPresentationsComponent);
