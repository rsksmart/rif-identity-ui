import React from 'react';
import { View, Text, TextInput } from 'react-native';
import { typeStyles, layoutStyles } from '../../../styles/';

interface EditItemProps {
  name: string;
  value: string;
  onChange: (text: string) => {};
  keyboardType?: 'default' | 'number-pad';
}

const EditItem: React.FC<EditItemProps> = ({ name, value, onChange, keyboardType }) => {
  return (
    <View>
      <Text style={typeStyles.paragraph}>{name}</Text>
      <TextInput
        style={layoutStyles.textInput}
        onChangeText={text => onChange(text)}
        value={value}
        editable
        maxLength={40}
        keyboardType={keyboardType ? keyboardType : 'default'}
      />
    </View>
  );
};

export default EditItem;
