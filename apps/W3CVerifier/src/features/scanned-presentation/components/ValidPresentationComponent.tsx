import React from 'react';
import {
  Text,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';

const ValidPresentationComponent: React.FC<{}> = () => {
  return (
    <Text>IS VALID!</Text>
  );
};

export default multilanguage(ValidPresentationComponent);
