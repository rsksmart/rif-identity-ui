import React from 'react';
import {
  Text, View,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import { VerifiedPresentation } from '../../api';
import { layoutStyles, typeStyles } from '../../styles';
import Button from '../../shared/Button'

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
    <View style={layoutStyles.container}>
      <Text style={typeStyles.header1}>{strings.scanned_credentials}</Text>
      <View style={layoutStyles.row}>
        {presentations.map(presentation => (
          <View>
            <Text>{presentation.fullName || presentation.failureReason}</Text>
            <Text>{presentation.dateVerified.toString()}</Text>
            <Text>{presentation.success.toString()}</Text>
          </View>
        ))}
      </View>
      <View>
        <Button title={strings.clean_scanned_credentials} onPress={handleCleanStorage} />
      </View>
    </View>
  );
};

export default multilanguage(ScannedPresentationsComponent);
