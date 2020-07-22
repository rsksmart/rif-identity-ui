import React from 'react';
import {
  Text, View, TouchableOpacity,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import Styles from '../../../styles/react'

interface ValidPresentationProps {
  strings: any;
  presentation: any;
  navigation: any;
}

const ValidPresentationComponent: React.FC<ValidPresentationProps> = ({
  strings, presentation, navigation
}) => {
  const handleGoToCredentialList = () => navigation.navigate('PresentationNavigation', { screen: 'List' })

  return (
    <View>
      <Text>IS VALID!</Text>
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
