import React from 'react';
import {
  Text, View, TouchableOpacity,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import Styles from '../../../styles/react'

interface InvalidPresentationProps {
  strings: any;
  navigation: any;
}

const InvalidPresentationComponent: React.FC<InvalidPresentationProps> = ({
  strings, navigation,
}) => {

  const handleGoToScanQR = () => navigation.navigate('MainFlow', { screen: 'ScanQR' })

  const handleGoToCredentialList = () => navigation.navigate('PresentationNavigation', { screen: 'List' })

  const handleReportPolice = () => {
    console.log('Reporting police')
  }
  return (
    <View>
      <Text>IS NOT VALID!</Text>
      <View>
        <TouchableOpacity style={Styles.button} onPress={handleGoToScanQR}>
          <View>
            <Text style={Styles.text}>{strings.scan_again}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={Styles.button} onPress={handleReportPolice}>
          <View>
            <Text style={Styles.text}>{strings.report_police}</Text>
          </View>
        </TouchableOpacity>
      </View>
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

export default multilanguage(InvalidPresentationComponent);
