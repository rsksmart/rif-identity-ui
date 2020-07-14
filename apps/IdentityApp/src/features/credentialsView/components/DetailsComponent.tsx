import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import { Credential } from '../reducer';

interface DetailsComponentProps {
  route: {
    key: string;
    name: string;
    params: {
      credential: Credential;
    };
  };
}

const DetailsComponent: React.FC<DetailsComponentProps> = ({ route }) => {
  const credential = route.params.credential;
  console.log('credential details:', credential);
  return <Text>{credential.name}</Text>;
};

const styles = StyleSheet.create({});

export default multilanguage(DetailsComponent);
