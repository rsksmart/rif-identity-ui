import React, { useState } from 'react';
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
  const [ viewDetails, setViewDetails ] = useState(false)

  const handleGoToCredentialList = () => navigation.navigate('PresentationNavigation', { screen: 'List' })

  const handleViewDetails = () => setViewDetails(!viewDetails)
  
  const goToCredentialListbutton = (
    <View>
      <TouchableOpacity style={Styles.button} onPress={handleGoToCredentialList}>
        <View>
          <Text style={Styles.text}>{strings.go_to_credential_list}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  const viewDetailsButton = (
    <View>
      <TouchableOpacity style={Styles.button} onPress={handleViewDetails}>
        <View>
          <Text style={Styles.text}>{viewDetails ? strings.hide_details : strings.view_details}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )

  if (isVerifying) {
    'Loading...'
  }

  if (viewDetails) {
    return (
      <View>
        <Text>IS VALID!</Text>
        {viewDetailsButton}
        <Text>Full Name: {presentation.fullName}</Text>
        <Text>Date scanned: {presentation.dateVerified.toString()}</Text>
        {goToCredentialListbutton}
      </View>
    )
  }

  return (
    <View>
      <Text>IS VALID!</Text>
      {viewDetailsButton}
      {goToCredentialListbutton}
    </View>
  )
};

export default multilanguage(ValidPresentationComponent);
