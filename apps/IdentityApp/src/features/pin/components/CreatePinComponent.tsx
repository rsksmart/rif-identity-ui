import React, { useContext }  from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import {View, Text} from 'react-native';

import PinInput from '../../../Libraries/PinInput/PinInputComponent';

interface CreatePinScreenProps {
  onSubmit: () => {};
  errorMessage: string;
}

const CreatePinScreen: React.FC<CreatePinScreenProps> = ({
  onSubmit,
  errorMessage,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  return (
    <View style={layout.column1}>
      <Text style={typography.paragraph}>
        To access your account quicker, please create a pin that is up to 8 digits long.
      </Text>
      {errorMessage && <Text style={typography.error}>{errorMessage}</Text>}
      <PinInput maxDigits={8} onSubmit={onSubmit} hidePin />
    </View>
  );
};

export default CreatePinScreen;
