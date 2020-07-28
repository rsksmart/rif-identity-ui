import React, { useState } from 'react';
import {
  Text, View, StyleSheet,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import Button from '../../shared/Button'
import ValidationResult from './ValidationResult'
import { VerifiedPresentation } from '../../api';
import PresentationDetails from './DetailComponent'
import { layoutStyles, colors } from '../../styles';

interface ValidPresentationProps {
  strings: any;
  presentation: VerifiedPresentation;
  navigation: any;
  isVerifying: boolean;
}

const PresentationComponent: React.FC<ValidPresentationProps> = ({
  strings, presentation, navigation, isVerifying,
}) => {
  const styles = StyleSheet.create({
    header: {
      textTransform: 'capitalize',
      lineHeight: 18,
      textAlign: 'center',
      fontSize: 22,
      color: presentation?.success ? colors.lightBlue : colors.red,
      fontWeight: 'bold',
      paddingTop: 50,
      paddingBottom: 20
    },
    details: {
      textTransform: 'capitalize',
      lineHeight: 18,
      textAlign: 'center',
      fontSize: 18,
      color: presentation?.success ? colors.lightBlue : colors.red,
      fontWeight: '500',
      margin: 8,
    },
  });

  const [ viewDetails, setViewDetails ] = useState(false)

  const handleGoToCredentialList = () => navigation.navigate('PresentationNavigation', { screen: 'List' })

  const handleViewDetails = () => setViewDetails(!viewDetails)

  const handleGoToScanQR = () => navigation.navigate('MainFlow', { screen: 'ScanQR' })

  if (isVerifying) {
    return (
      <Text>Verifying...</Text>
    )
  }
  return (
    <View style={layoutStyles.container}>
      <Text style={styles.header}>{presentation.success ? strings.success : strings.notSuccess}</Text>
      <ValidationResult presentation={presentation} strings={strings} />
      {
        presentation.success && 
        <Text style={styles.details} onPress={handleViewDetails}>
          {viewDetails ? strings.hide_details : strings.view_details}
        </Text>
      }
      {
        viewDetails && 
        <PresentationDetails presentation={presentation} strings={strings} />
      }
      {
        !presentation.success &&
        <Button title={strings.scan_again} onPress={handleGoToScanQR} />
      }
      <Button title={strings.go_to_credential_list} onPress={handleGoToCredentialList} />
    </View>
  )
};

export default multilanguage(PresentationComponent);
