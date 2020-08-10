import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
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
  });

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
      <Text>
        CREDENTIAL ICON
      </Text>
      <Text style={styles.subtitle}>
        {(presentation.success && strings.valid_id_credential_card) || strings.invalid_id_credential_card}
      </Text>
    </View>
  );
};

export default ValidationResult;
