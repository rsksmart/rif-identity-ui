import React, { useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { StyleSheet, View, Text } from 'react-native';

interface Claim {
  claimType: string;
  claimValue: string;
}

interface ClaimsDataComponentProps {
  claims: Claim[];
  strings: any;
}

const JwtDataComponent: React.FC<ClaimsDataComponentProps> = ({ claims, strings }) => {
  const { layout, typography, colors }: ThemeInterface = useContext(ThemeContext);

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
      <Text style={typography.paragraphBold}>{strings.metadata}:</Text>
      {claims.map((claim: any) => (
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
    </View>
  );
};

export default multilanguage(JwtDataComponent);
