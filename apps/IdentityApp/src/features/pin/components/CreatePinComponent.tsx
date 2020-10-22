import React, { useContext } from 'react';
import { multilanguage } from 'redux-multilanguage';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { ScrollView, Text } from 'react-native';
import PinInput from '../../../Libraries/PinInput/PinInputComponent';
import MessageComponent from '../../../Libraries/Message/MessageComponent';

interface CreatePinScreenProps {
  onSubmit: () => {};
  errorMessage: string;
  strings: any;
}

const CreatePinScreen: React.FC<CreatePinScreenProps> = ({ onSubmit, errorMessage, strings }) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  return (
    <ScrollView style={layout.column1}>
      <Text style={typography.header1}>{strings.create_pin}</Text>
      <Text style={typography.paragraph}>{strings.create_pin_explanation}</Text>
      {errorMessage && <MessageComponent message={errorMessage} type="ERROR" />}
      <PinInput maxDigits={4} onSubmit={onSubmit} hidePin />
    </ScrollView>
  );
};

export default multilanguage(CreatePinScreen);
