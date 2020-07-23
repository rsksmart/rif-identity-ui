import React from 'react';
import {
  Text,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';

const InvalidPresentationComponent: React.FC<{}> = () => {
  return (
    <Text>IS NOT VALID!</Text>
  );
};

export default multilanguage(InvalidPresentationComponent);
