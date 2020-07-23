import React from 'react';
import {
  Text, View, TouchableOpacity,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import Styles from '../../../styles/react'
import { VerifiedPresentation } from '../../../api';

interface ValidPresentationProps {
  strings: any;
  presentation: VerifiedPresentation;
  navigation: any;
  isVerifying: boolean
}

const ValidPresentationComponent: React.FC<ValidPresentationProps> = ({
  strings, presentation, navigation, isVerifying
}) => {
  const handleGoToCredentialList = () => navigation.navigate('PresentationNavigation', { screen: 'List' })

  if (isVerifying) {
    'Loading...'
  }

  return (
    <View>
      <Text>IS VALID!</Text>
      <Text>Full Name: {presentation.fullName}</Text>
      <Text>Date scanned: {presentation.dateVerified.toString()}</Text>

      <View>
        <TouchableOpacity style={Styles.button} onPress={handleGoToCredentialList}>
          <View>
            <Text style={Styles.text}>{strings.go_to_credential_list}</Text>
          </View>
        </TouchableOpacity>
      </View> 
    </View>
  );
};

export default multilanguage(ValidPresentationComponent);
