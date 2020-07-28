import React, { useContext }  from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, View, Text } from 'react-native';

interface DisplayItemProps {
  name: string;
  value: string | null;
}

const DisplayItem: React.FC<DisplayItemProps> = ({ name, value }) => {
  const { typography }: ThemeInterface = useContext(ThemeContext);
  if (value === '') {
    return <></>;
  }

  return (
    <View>
      <Text
        style={[ typography.paragraphBold, styles.title ]}>
        {name}
      </Text>
      <Text style={[ typography.paragraph, styles.value ]}>{value}</Text>
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
