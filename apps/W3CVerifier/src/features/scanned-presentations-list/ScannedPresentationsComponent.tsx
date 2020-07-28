import React from 'react';
import {
  Text, View,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import { VerifiedPresentation } from '../../api';
import { layoutStyles, typeStyles } from '../../styles';
import Button from '../../shared/Button'
import PresentationList from './PresentationList'

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
      <Text>{strings.no_presentations}</Text>
    )  
  }
  
  return (
    <View style={layoutStyles.container}>
      <Text style={typeStyles.header1}>{strings.scanned_credentials}</Text>
      <PresentationList presentations={presentations} strings={strings} />
      <Button title={strings.clean_scanned_credentials} onPress={handleCleanStorage} />
    </View>
  );
};

export default multilanguage(ScannedPresentationsComponent);
