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

  return (
    presentation.credentialDetails?.credentialSubject &&
    <ScrollView>
      {/* {Object.keys(presentation.credentialDetails?.credentialSubject).map((item: any) => ( */}
      {presentation.credentialDetails?.credentialSubject.otherClaims.map((item: any) => (
        item !== 'id' &&
        <View style={styles.row} key={item['claimType']}>
          <View style={styles.cell}>
            <Text style={styles.labelText}>{strings[item] ? strings[item] : item['claimType']}:</Text>
          </View>
          <View style={styles.cell}>
            <Text style={styles.valueText}>{item['claimValue']}</Text>
            {/* <Text style={styles.valueText}>{presentation.credentialDetails?.credentialSubject[item].toString()}</Text> */}
          </View>
        </View>
      ))}
    </ScrollView>
  )
};

export default PresentationDetail;
