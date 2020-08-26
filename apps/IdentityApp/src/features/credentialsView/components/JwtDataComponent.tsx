import React, { useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, View, Text } from 'react-native';
import jwtDecode from 'jwt-decode';
import moment from 'moment';
import { CopyButton } from '../../../Libraries/CopyButton';

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
  iat: number;
  exp?: number;
}

const JwtDataComponent: React.FC<JwtDataComponentProps> = ({ jwt, strings }) => {
  const { layout, typography, colors }: ThemeInterface = useContext(ThemeContext);
  const data: JwtInterface = jwtDecode(jwt);
  const metadata: any = data.vc.credentialSubject;

  const styles = StyleSheet.create({
    headingColumn: {
      paddingLeft: 5,
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
      paddingLeft: 10,
    },
    did: {
      fontSize: 16,
      color: colors.darkGray,
      paddingLeft: 5,
    },
    noMargin: {
      marginBottom: 0,
    },
  });

  return (
    <View>
      <Text style={typography.paragraphBold}>{strings.metadata}</Text>
      {metadata.otherClaims?.map((claim: any) => (
        <View style={layout.row} key={claim.claimType}>
          <View style={styles.headingColumn}>
            <Text style={styles.heading}>
              {strings[claim.claimType] ? strings[claim.claimType] : claim.claimType}
            </Text>
          </View>
          <View style={styles.viewColumn}>
            <Text style={styles.value}>{claim.claimValue}</Text>
          </View>
        </View>
      ))}
      <Text style={[typography.paragraphBold, styles.noMargin]}>{strings.issuer}:</Text>
      <CopyButton value={data.iss} color={colors.darkGray} />

      <Text style={[typography.paragraphBold, styles.noMargin]}>{strings.subject}:</Text>
      <CopyButton value={data.sub} color={colors.darkGray} />

      {data.iat && (
        <>
          <Text style={typography.paragraphBold}>{strings.issuance_date}:</Text>
          <Text style={styles.did}>
            {moment(data.iat * 1000)
              .format('MMMM Do YYYY, h:mm a')
              .toString()}
          </Text>
        </>
      )}

      {data.exp && (
        <>
          <Text style={typography.paragraphBold}>{strings.expiration_date}:</Text>
          <Text style={styles.did}>
            {moment(data.exp * 1000)
              .format('MMMM Do YYYY, h:mm a')
              .toString()}
          </Text>
        </>
      )}
    </View>
  );
};

export default multilanguage(JwtDataComponent);
