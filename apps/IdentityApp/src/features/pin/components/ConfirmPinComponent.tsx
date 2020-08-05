import React, { useContext } from 'react';
import { multilanguage } from 'redux-multilanguage';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { View, Text } from 'react-native';

import PinInput from '../../../Libraries/PinInput/PinInputComponent';

interface ConfirmPinComponentProps {
  onSubmit: () => {};
  errorMessage: string | false;
  strings: any;
}

const ConfirmPinComponent: React.FC<ConfirmPinComponentProps> = ({
  onSubmit,
  errorMessage,
  strings,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  return (
    <View style={layout.column1}>
      <Text style={typography.header1}>{strings.confirm_pin}</Text>
      <Text style={typography.paragraph}>{strings.confirm_pin_explanation}</Text>
      {errorMessage && <Text style={typography.error}>{strings.confirm_pin_error}</Text>}
      <PinInput maxDigits={8} onSubmit={onSubmit} hidePin />
    </View>
  );
};

export default multilanguage(ConfirmPinComponent);
