import React from 'react';
import { multilanguage } from 'redux-multilanguage';
import { ScrollView, View, Text } from 'react-native';
import { layoutStyles, typeStyles } from '../../../styles';
import { SquareButton } from '../../../Libraries/Button';

interface RequestTypeComponentProps {
  strings: any;
}

const RequestTypeComponent: React.FC<RequestTypeComponentProps> = ({ strings }) => {
  const handlePress = () => {
    console.log('okie dokie!');
  };

  return (
    <ScrollView style={layoutStyles.container}>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <Text style={typeStyles.header1}>{strings.confirm_request}</Text>
          <Text style={typeStyles.paragraph}>{strings.confirm_request_explanation}</Text>

          <SquareButton title={strings.confirm} onPress={handlePress} />
        </View>
      </View>
    </ScrollView>
  );
};

export default multilanguage(RequestTypeComponent);
