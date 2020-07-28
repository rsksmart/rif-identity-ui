import React, { useContext }  from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { View, Text } from 'react-native';
import { multilanguage } from 'redux-multilanguage';

import PinInput from '../../../Libraries/PinInput/PinInputComponent';

interface SigninWithPinComponentProps {
  onSubmit: () => {};
  errorMessage: string;
  strings: any;
}

const SigninWithPinComponent: React.FC<SigninWithPinComponentProps> = ({
  onSubmit,
  errorMessage,
  strings,
}) => {
  const theme: ThemeInterface = useContext(ThemeContext);
  return (
    <View style={theme.layout.container}>
      <View style={theme.layout.column1}>
        <Text style={theme.type.header1}>{strings.login_with_pin}</Text>
        {errorMessage && <Text style={theme.type.error}>{strings[errorMessage]}</Text>}
        <PinInput maxDigits={8} onSubmit={onSubmit} hidePin />
      </View>
    </View>
  );
};

export default multilanguage(SigninWithPinComponent);
