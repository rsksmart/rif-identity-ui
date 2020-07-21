import React from 'react';
import {
  Text,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';

const VerifiedPresentationsComponent: React.FC<{}> = () => {
  return (
    <Text>Verified presentations list</Text>
  );
};

export default multilanguage(VerifiedPresentationsComponent);
