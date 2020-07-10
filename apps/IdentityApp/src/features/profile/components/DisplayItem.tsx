import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { typeStyles } from '../../../styles/';

interface DisplayItemProps {
  name: string;
  value: string | null;
}

const DisplayItem: React.FC<DisplayItemProps> = ({ name, value }) => {
  return (
    <View>
      <Text
        style={{
          ...typeStyles.paragraph,
          ...typeStyles.bold,
          ...styles.title,
        }}>
        {name}
      </Text>
      <Text style={{ ...typeStyles.paragraph, ...styles.value }}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginBottom: 0,
  },
  value: {
    marginTop: 5,
    marginLeft: 20,
  },
});

export default DisplayItem;
