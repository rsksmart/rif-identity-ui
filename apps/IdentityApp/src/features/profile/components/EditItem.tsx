import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { typeStyles, layoutStyles } from '../../../styles/';

interface EditItemProps {
  name: string;
  value: string;
  onChange: (text: string) => {};
}

const EditItem: React.FC<EditItemProps> = ({ name, value, onChange }) => {
  return (
    <View>
      <Text style={typeStyles.paragraph}>{name}</Text>
      <TextInput
        style={layoutStyles.textInput}
        onChangeText={text => onChange(text)}
        value={value}
        editable
        maxLength={40}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default EditItem;
