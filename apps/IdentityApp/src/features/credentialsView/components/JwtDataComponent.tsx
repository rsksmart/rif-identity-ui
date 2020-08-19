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
  iss: string;
  sub: string;
}

const JwtDataComponent: React.FC<JwtDataComponentProps> = ({ jwt, strings }) => {
  const { layout, typography, colors }: ThemeInterface = useContext(ThemeContext);
  const data: JwtInterface = jwtDecode(jwt);
  const metadata: any = data.vc.credentialSubject;

  const styles = StyleSheet.create({
    headingColumn: {
      paddingLeft: 20,
      width: '40%',
    },
    heading: {
      color: colors.darkGray,
      fontSize: 16,
      paddingBottom: 5,
    },
    viewColumn: {
      width: '60%',
    },
    value: {
      fontSize: 16,
      color: colors.primary,
    },
    did: {
      fontSize: 16,
      color: colors.darkGray,
      paddingLeft: 20,
    },
  });

  return (
    <View>
      <Text style={typography.paragraphBold}>{strings.metadata}</Text>
      {metadata.otherClaims?.map((claim: any) => (
        <View style={layout.row} key={claim.claimType}>
          <View style={styles.headingColumn}>
            <Text style={styles.heading}>
              {strings[claim.claimType.toLowerCase()]
                ? strings[claim.claimType.toLowerCase()]
                : claim.claimType}
            </Text>
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.value}>{claim.claimValue}</Text>
          </View>
        </View>
      ))}
      <Text style={typography.paragraphBold}>{strings.issuer}:</Text>
      <Text style={styles.did}>{data.iss}</Text>
      <Text style={typography.paragraphBold}>{strings.subject}:</Text>
      <Text style={styles.did}>{data.sub}</Text>
    </View>
  );
};

export default multilanguage(JwtDataComponent);
