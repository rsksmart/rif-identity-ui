import React from 'react';
import {
  Text, View, TouchableOpacity,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import { VerifiedPresentation } from '../../api';
import { layoutStyles, typeStyles } from '../../styles';
import Styles from '../../styles/react'

interface ScannedPresentationProps {
  presentations: VerifiedPresentation[],
  emptyHistory: boolean,
  strings: any,
  cleanStorage: () => void
}

const ScannedPresentationsComponent: React.FC<ScannedPresentationProps> = ({
  presentations, emptyHistory, strings, cleanStorage
}) => {
  const handleCleanStorage = () => cleanStorage()


  if (emptyHistory) {
    return (
      <Text>No presentations scanned yet</Text>
    )  
  }
  
  return (
    <View>
      <Text style={typeStyles.header1}>{strings.scanned_credentials}</Text>
      <View style={{ ...layoutStyles.row}}>
        {presentations.map(presentation => (
          <View>
            <Text>{presentation.fullName || presentation.failureReason}</Text>
            <Text>{presentation.dateVerified.toString()}</Text>
            <Text>{presentation.success.toString()}</Text>
          </View>
        ))}
      </View>
      <View>
        <TouchableOpacity style={Styles.button} onPress={handleCleanStorage}>
          <View>
            <Text style={Styles.text}>{strings.clean_scanned_credentials}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default multilanguage(ScannedPresentationsComponent);
