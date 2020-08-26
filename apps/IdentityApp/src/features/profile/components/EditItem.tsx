import React, { useContext }  from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { View, Text, TextInput } from 'react-native';

interface EditItemProps {
  name: string;
  value: string;
  onChange: (text: string) => {};
  keyboardType?: 'default' | 'number-pad' | 'phone-pad' | 'email-address';
}

const EditItem: React.FC<EditItemProps> = ({ name, value, onChange, keyboardType }) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  return (
    <View>
      <Text style={typography.paragraph}>{name}</Text>
      <TextInput
        style={layout.textInput}
        onChangeText={text => onChange(text)}
        value={value}
        editable
        maxLength={120}
        keyboardType={keyboardType ? keyboardType : 'default'}
      />
    </View>
  );
};

export default EditItem;
