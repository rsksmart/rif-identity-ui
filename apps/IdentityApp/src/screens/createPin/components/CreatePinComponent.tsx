import React from 'react';
import {View, Text} from 'react-native';

import PinButtons from '../../../components/shareable/pin/PinButtonsComponent';
import {layoutStyles, typeStyles} from '../../../styles';

interface CreatePinScreenProps {
  onSubmit: () => {};
  errorMessage: string;
}

const CreatePinScreen: React.FC<CreatePinScreenProps> = ({
  onSubmit,
  errorMessage,
}) => {
  return (
    <View style={layoutStyles.column1}>
      <Text style={typeStyles.paragraph}>
        To access your account quicker, please create a pin that is up to 8 digits long.
      </Text>
      {errorMessage && <Text style={typeStyles.error}>{errorMessage}</Text>}
      <PinButtons maxDigits={8} onSubmit={onSubmit} hidePin />
    </View>
  );
};

export default CreatePinScreen;
