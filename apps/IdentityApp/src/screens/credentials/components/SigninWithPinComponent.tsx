import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {layoutStyles, typeStyles} from '../../../styles';
import PinInput from '../../../Libraries/PinInput/PinInputComponent';

interface SigninWithPinComponentProps {
  onSubmit: () => {};
  errorMessage: string,
}

const SigninWithPinComponent: React.FC<SigninWithPinComponentProps> = ({
  onSubmit,
  errorMessage,
}) => {
  return (
    <View style={layoutStyles.column1}>
      <Text style={typeStyles.paragraph}>Signin with your Pin</Text>
      {errorMessage && <Text style={typeStyles.error}>{errorMessage}</Text>}
      <PinInput maxDigits={8} onSubmit={onSubmit} hidePin />
    </View>
  );
};

const styles = StyleSheet.create({});

export default SigninWithPinComponent;
