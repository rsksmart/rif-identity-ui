import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import { VerifiedPresentation } from '../../api'


interface PresentationDetailProps {
  presentation: VerifiedPresentation;
  strings: any
}

const PresentationDetail: React.FC<PresentationDetailProps> = ({
  presentation,
  strings,
}) => {
  return (
    presentation.credentialDetails?.credentialSubject &&
    <View>
      {Object.keys(presentation.credentialDetails?.credentialSubject).map(item => (
        item !== 'id' &&
        <Text>
          {strings[item] ? strings[item] : item}: {presentation.credentialDetails?.credentialSubject[item].toString()}
        </Text>
      ))}
    </View>
  )
};

export default PresentationDetail;
