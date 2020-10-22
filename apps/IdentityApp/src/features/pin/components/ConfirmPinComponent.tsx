import React, { useContext } from 'react';
import { multilanguage } from 'redux-multilanguage';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { ScrollView, Text } from 'react-native';

import PinInput from '../../../Libraries/PinInput/PinInputComponent';
import MessageComponent from '../../../Libraries/Message/MessageComponent';

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
    <ScrollView style={layout.column1}>
      <Text style={typography.header1}>{strings.confirm_pin}</Text>
      <Text style={typography.paragraph}>{strings.confirm_pin_explanation}</Text>
      {errorMessage && <MessageComponent message={strings.confirm_pin_error} type="ERROR" />}
      <PinInput maxDigits={8} onSubmit={onSubmit} hidePin />
    </ScrollView>
  );
};

export default multilanguage(ConfirmPinComponent);
