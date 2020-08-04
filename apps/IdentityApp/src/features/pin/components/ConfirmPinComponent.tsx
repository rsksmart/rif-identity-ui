import React, { useContext }  from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { View, Text } from 'react-native';

import PinInput from '../../../Libraries/PinInput/PinInputComponent';

interface ConfirmPinComponentProps {
  onSubmit: () => {};
  errorMessage: string | false;
}

const ConfirmPinComponent: React.FC<ConfirmPinComponentProps> = ({
  onSubmit,
  errorMessage,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  return (
    <View style={layout.column1}>
      <Text style={typography.paragraph}>Confirm your pin</Text>
      {errorMessage && <Text style={typography.error}>Pin did not match!</Text>}
      <PinInput maxDigits={8} onSubmit={onSubmit} hidePin />
    </View>
  );
};

export default ConfirmPinComponent;
