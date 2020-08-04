import React, { useState, useContext } from 'react';
import { multilanguage } from 'redux-multilanguage';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { SquareButton } from '../../Libraries/Button';

interface RestoreWalletComponentProps {
  onSubmit: (text: String) => void | null;
  mnemonicError: string | null;
  strings: any;
}

const RestoreWalletComponent: React.FC<RestoreWalletComponentProps> = ({ onSubmit, mnemonicError, strings }) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [textValue, setTextValue] = useState('');

  return (
    <>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.paragraph}>Enter your seed phrase seperated by spaces</Text>
          {mnemonicError && <Text style={typography.error}>{strings[mnemonicError]}</Text>}
        </View>
      </View>
      <View style={layout.row}>
        <View style={layout.column1}>
          <View style={layout.borderRow}>
            <TextInput
              style={styles.textInput}
              multiline={true}
              numberOfLines={4}
              value={textValue}
              onChangeText={text => setTextValue(text)}
              autoCapitalize="none"
              placeholder={strings.enter_seed}
            />
          </View>
        </View>
      </View>
      <View style={layout.row}>
        <View style={layout.column1}>
          <SquareButton title="Restore" onPress={() => onSubmit(textValue)} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  textInput: {
    textAlignVertical: 'top',
  },
});

export default multilanguage(RestoreWalletComponent);
