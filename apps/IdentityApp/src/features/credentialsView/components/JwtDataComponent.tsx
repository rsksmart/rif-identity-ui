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
      {metadata.otherClaims?.map((claim: any) => (
        <View style={layout.row} key={claim.claimType}>
          <View style={styles.headingColumn}>
            <Text style={styles.heading}>{strings[claim.claimType] ? strings[claim.claimType] : claim.claimType}</Text>
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.value}>{claim.claimValue}</Text>
          </View>
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
  viewColumn: {
    width: '60%',
  },
  value: {
    fontSize: 16,
    color: '#50555C',
  },
});

export default multilanguage(JwtDataComponent);
