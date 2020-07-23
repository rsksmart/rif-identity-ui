import React, { useState } from 'react';
import {
  Text, View, TextInput, TouchableOpacity,
} from 'react-native';
import { layoutStyles, typeStyles, colors } from '../../styles/';
import { multilanguage } from 'redux-multilanguage';
import Styles from '../../styles/react'

interface ScanQRProps {
  strings: any;
  handleScan: (jwt: string, navigation: any) => void | null;
  navigation: any;
}

const ScanQRComponent: React.FC<ScanQRProps> = ({
  strings, handleScan, navigation,
}) => {
  const [jwt, setJwt] = useState('')

  const handleChangeJwt = (jwt: string) => setJwt(jwt)
  
  const handleVerifyPress = () => handleScan(jwt, navigation)

  return (
    <View style={layoutStyles.row}>
      <Text style={typeStyles.header1}>{strings.verify_credentials}</Text>
      <Text style={typeStyles.header2}>{strings.scan_citizen_qr}</Text>
      <View style={layoutStyles.column1}>
        <View>
          <Text style={typeStyles.paragraph}>{strings.enter_jwt}</Text>
          <TextInput
            style={layoutStyles.textInput}
            onChangeText={text => handleChangeJwt(text)}
            value={jwt}
            editable
          />
        </View>
        <View>
          <TouchableOpacity style={Styles.button} onPress={handleVerifyPress}>
            <View>
              <Text style={Styles.text}>{strings.verify_jwt}</Text>
            </View>
          </TouchableOpacity>
        </View> 
      </View> 
    </View>
  );
};


export default multilanguage(ScanQRComponent);
