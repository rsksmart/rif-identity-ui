import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, View, Text } from 'react-native';
import jwtDecode from 'jwt-decode';
import { typeStyles } from '../../../styles';

interface JwtDataComponentProps {
  jwt: string;
  strings: any;
}

interface JwtInterface {
  vc: {
    credentialSubject: {};
  };
}

const JwtDataComponent: React.FC<JwtDataComponentProps> = ({ jwt, strings }) => {
  const paragraphBold = [typeStyles.paragraph, typeStyles.bold];
  const data: JwtInterface = jwtDecode(jwt);
  const metadata: any = data.vc.credentialSubject;

  return (
    <View>
      <Text style={paragraphBold}>Credential Metadata:</Text>
      {Object.keys(metadata).map(key => (
        <Text style={{ ...typeStyles.paragraph, ...styles.metadata }} key={key}>
          {strings[key] ? strings[key] : key} : {metadata[key]}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  metadata: {
    marginTop: 0,
    marginLeft: 20,
  },
});

export default multilanguage(JwtDataComponent);
