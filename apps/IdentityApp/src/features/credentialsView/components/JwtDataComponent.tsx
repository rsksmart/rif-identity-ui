import React, { useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, View, Text } from 'react-native';
import jwtDecode from 'jwt-decode';

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
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const data: JwtInterface = jwtDecode(jwt);
  const metadata: any = data.vc.credentialSubject;
  
  return (
    <View>
      <Text style={typography.paragraphBold}>Credential Metadata:</Text>
      {Object.keys(metadata).map(key => (
        <View style={layout.row} key={key}>
          <View style={styles.headingColumn}>
            <Text style={styles.heading}>{strings[key] ? strings[key] : key}</Text>
          </View>
          <Text style={styles.value}>{metadata[key]}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  headingColumn: {
    paddingLeft: 20,
    width: '40%',
  },
  heading: {
    color: '#919191',
    fontSize: 16,
    textTransform: 'capitalize',
    paddingBottom: 5,
  },
  value: {
    fontSize: 16,
    color: '#50555C',
  },
});

export default multilanguage(JwtDataComponent);
