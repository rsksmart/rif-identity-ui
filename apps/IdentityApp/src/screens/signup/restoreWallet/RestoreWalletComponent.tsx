import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  NativeSyntheticEvent,
  TextInputChangeEventData,
  GestureResponderEvent,
} from 'react-native';

import {layoutStyles, typeStyles} from '../../../styles';

import {SquareButton} from '../../../Libraries/Button';

interface RestoreWalletComponentProps {
  onSubmit: (event: GestureResponderEvent) => void | null;
}

const RestoreWalletComponent: React.FC<RestoreWalletComponentProps> = ({
  onSubmit,
}) => {
  const [textValue, setTextValue] = useState('');
  return (
    <>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <Text style={typeStyles.paragraph}>
            Enter your seed phrase seperated by spaces
          </Text>
        </View>
      </View>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <View style={layoutStyles.borderRow}>
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
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
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
