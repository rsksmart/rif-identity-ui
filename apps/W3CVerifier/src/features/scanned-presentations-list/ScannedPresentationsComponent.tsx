import React from 'react';
import {
  Text, View,
} from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import { VerifiedPresentation } from '../../api';
import { layoutStyles } from '../../styles';

interface ScannedPresentationProps {
  presentations: VerifiedPresentation[],
  emptyHistory: boolean
}

const ScannedPresentationsComponent: React.FC<ScannedPresentationProps> = ({
  presentations, emptyHistory
}) => {
  if (emptyHistory) {
    return (
      <Text>No presentations scanned yet</Text>
    )  
  }
  
  return (
    <View style={{ ...layoutStyles.row}}>
        {presentations.map(presentation => (
          <View>
            <Text>{presentation.fullName}</Text>
            <Text>{presentation.dateVerified.toString()}</Text>
          </View>
        ))}
      </View>
  );
};

export default multilanguage(ScannedPresentationsComponent);
