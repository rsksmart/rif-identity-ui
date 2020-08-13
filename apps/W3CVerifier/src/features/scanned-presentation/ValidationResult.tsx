import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import { colors } from '../../styles';
import { VerifiedPresentation } from '../../api';

interface ValidationResultProps {
  presentation: VerifiedPresentation;
  strings: any,
}

const ValidationResult: React.FC<ValidationResultProps> = ({
  presentation,
  strings,
}) => {

  const gutter = 18;

  const styles = StyleSheet.create({
    container: {
      borderColor: presentation.success ? colors.lightBlue : colors.red,
      alignItems: 'center',
      borderWidth: 1,
      borderStyle: 'solid',
      borderRadius: 20,
      margin: gutter,
      padding: gutter,
    },
    title: {
      textTransform: 'capitalize',
      lineHeight: 18,
      textAlign: 'center',
      fontSize: 18,
      color: colors.black,
      fontWeight: 'normal',
      margin: gutter
    },
    subtitle: {
      lineHeight: 18,
      textAlign: 'center',
      fontSize: 20,
      color: colors.black,
      fontWeight: 'bold',
      margin: gutter
    },
    row: {
      alignSelf: 'stretch',
      flexDirection: 'row'
    },
    cell: { 
      alignSelf: 'stretch',
    },
    valueText: {
      color: colors.gray4,
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 18,
    },
    labelText: {
      color: colors.gray3,
      fontWeight: '500',
      fontSize: 12,
      lineHeight: 18,
    },
  });

  const transformDID = (did: string) => did.slice(0, 25) + '...' + did.slice(-4)

  const icon = (type: 'drivers_license' | 'parking_permit' | undefined) => {
    switch (type?.toLowerCase()) {
      case 'drivers_license':
        return <FontAwesome name="automobile" color={colors.gray4} size={30} />;
      case 'parking_permit':
        return <FontAwesome5 name="parking" color={colors.gray4} size={30} />;
      default:
        return <FontAwesome name="id-card" color={colors.gray4} size={30} />;
    }
  }

  const legend = (type: 'drivers_license' | 'parking_permit' | undefined) => {
    switch (type?.toLowerCase()) {
      case 'drivers_license':
        return strings.valid_drivers_license
      case 'parking_permit':
        return strings.valid_parking_permit
      default:
        return strings.valid_id_credential_card
    }
  }

  return (
    <View style={styles.container}>
      <Text>
        <Ionicons
          name={
            presentation.success
              ? 'checkmark-circle-outline'
              : 'close-circle-outline'
          }
          size={50}
          color={presentation.success ? colors.lightBlue : colors.red}
        />
      </Text>
      <Text style={styles.title}>
        {presentation.success ? presentation.fullName : presentation.failureReason}
      </Text>
      {icon(presentation.type)}
      <Text style={styles.subtitle}>
        {(presentation.success && legend(presentation.type)) || strings.invalid_id_credential_card}
      </Text>
      {(
        presentation.success && 
        <View>
          <View key="issuer" style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.labelText}>{strings.issuer}: </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.valueText}>{transformDID(presentation.credentialDetails?.issuer!)}</Text>
            </View>
          </View>
          <View key="subject" style={styles.row}>
            <View style={styles.cell}>
              <Text style={styles.labelText}>{strings.subject}: </Text>
            </View>
            <View style={styles.cell}>
              <Text style={styles.valueText}>{transformDID(presentation.credentialDetails?.subject!)}</Text>
            </View>
          </View>
        </View>
      )}
    </View>
  );
};

export default ValidationResult;
