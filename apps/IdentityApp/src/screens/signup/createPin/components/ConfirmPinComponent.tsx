import React from 'react';
import {View, Text} from 'react-native';

import PinButtons from '../../../../components/shareable/pin/PinButtonsComponent';
import {layoutStyles, typeStyles} from '../../../../styles';

interface ConfirmPinComponentProps {
  onSubmit: () => {};
  errorMessage: string | false;
}

const ConfirmPinComponent: React.FC<ConfirmPinComponentProps> = ({
  onSubmit,
  errorMessage,
}) => {
  return (
    <View style={layoutStyles.column1}>
      <Text style={typeStyles.paragraph}>Confirm your pin</Text>
      {errorMessage && <Text style={typeStyles.error}>Pin did not match!</Text>}
      <PinButtons maxDigits={8} onSubmit={onSubmit} hidePin />
    </View>
  );
};

export default ConfirmPinComponent;
