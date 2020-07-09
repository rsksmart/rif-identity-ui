import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {multilanguage} from 'redux-multilanguage';

import {layoutStyles, typeStyles} from '../../../styles';
import PinInput from '../../../Libraries/PinInput/PinInputComponent';

interface SigninWithPinComponentProps {
  onSubmit: () => {};
  errorMessage: string,
  strings: any,
}

const SigninWithPinComponent: React.FC<SigninWithPinComponentProps> = ({
  onSubmit,
  errorMessage,
  strings,
}) => {
  return (
    <View style={layoutStyles.column1}>
      <Text style={typeStyles.paragraph}>{strings.login_with_pin}</Text>
      {errorMessage && <Text style={typeStyles.error}>{strings[errorMessage]}</Text>}
      <PinInput maxDigits={8} onSubmit={onSubmit} hidePin />
    </View>
  );
};

const styles = StyleSheet.create({});

export default multilanguage(SigninWithPinComponent);
