import React from 'react';
import {
  Text, View,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import { VerifiedPresentation } from '../../api';
import { layoutStyles, typeStyles } from '../../styles';
import Button from '../../shared/Button'
import PresentationListContainer from './PresentationListContainer'

interface ScannedPresentationProps {
  presentations: VerifiedPresentation[],
  emptyHistory: boolean,
  strings: any,
  cleanStorage: () => void,
}

const ScannedPresentationsComponent: React.FC<ScannedPresentationProps> = ({
  emptyHistory, strings, cleanStorage
}) => {
  const handleCleanStorage = () => cleanStorage()

  if (emptyHistory) {
    return (
      <View style={layoutStyles.container}>
        <Text style={typeStyles.header1}>{strings.scanned_credentials}</Text>
        <Text style={typeStyles.header2}>{strings.no_presentations}</Text>
      </View>
    )  
  }
  
  return (
    <View style={layoutStyles.container}>
      <Text style={typeStyles.header1}>{strings.scanned_credentials}</Text>
      <PresentationListContainer />
      <Button title={strings.clean_scanned_credentials} onPress={handleCleanStorage} />
    </View>
  );
};

export default multilanguage(ScannedPresentationsComponent);
