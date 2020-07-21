import React from 'react';
import {
  Text,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';

const ProfileComponent: React.FC<{}> = () => {
  return (
    <Text>Profile component</Text>
  );
};

export default multilanguage(ProfileComponent);
