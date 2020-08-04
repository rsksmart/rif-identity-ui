import React, { useState, useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  GestureResponderEvent,
} from 'react-native';

import {SquareButton} from '../../../Libraries/Button';

interface RestoreWalletComponentProps {
  onSubmit: (event: GestureResponderEvent) => void | null;
}

const RestoreWalletComponent: React.FC<RestoreWalletComponentProps> = ({
  onSubmit,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [textValue, setTextValue] = useState('');
  return (
    <>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.paragraph}>
            Enter your seed phrase seperated by spaces
          </Text>
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
              onChange={(
                evt: NativeSyntheticEvent<TextInputChangeEventData>,
              ): void => setTextValue(evt.target.text)}
              placeholder="enter your seed phrase"
            />
          </View>
        </View>
      </View>
      <View style={layout.row}>
        <View style={layout.column1}>
          <SquareButton title="Restore" onPress={onSubmit} />
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

export default RestoreWalletComponent;
