import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { VerifiedPresentation } from '../../api'
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../../styles';


interface PresentationDetailProps {
  presentation: VerifiedPresentation;
  strings: any
}

const PresentationDetail: React.FC<PresentationDetailProps> = ({
  presentation,
  strings,
}) => {
  const styles = StyleSheet.create({
    table: {
      height: 100
    },
    row: {
      alignSelf: 'stretch',
      flexDirection: 'row'
    },
    cell: { 
      alignSelf: 'stretch',
      width: 100,
    },
    valueText: {
      color: colors.gray4,
      fontWeight: '500',
      fontSize: 10,
      lineHeight: 18,
    },
    labelText: {
      color: colors.gray3,
      fontWeight: '500',
      fontSize: 10,
      lineHeight: 18,
    },
  })

  const metadata = presentation.credentialDetails?.credentialSubject

  return (
    metadata &&
    <ScrollView>
      {metadata.otherClaims.map((elem: any) => (
        <View style={styles.row} key={elem.claimType}>
          <View style={styles.cell}>
            <Text style={styles.labelText}>{strings[elem.claimType] ? strings[elem.claimType] : elem.claimType}:</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.valueText}>{elem.claimValue}</Text>
          </View>
        </View>
      ))}
    </ScrollView>
  )
};

export default PresentationDetail;
