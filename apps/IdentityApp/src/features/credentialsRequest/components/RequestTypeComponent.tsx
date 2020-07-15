import React, { useState } from 'react';
import { multilanguage } from 'redux-multilanguage';
import { Dimensions, StyleSheet, ScrollView, View, Text } from 'react-native';
import { layoutStyles, typeStyles } from '../../../styles';
import DropDownPicker from 'react-native-dropdown-picker';
import { SquareButton } from '../../../Libraries/Button';

interface RequestTypeComponentProps {
  strings: any;
  types: string[];
}

const RequestTypeComponent: React.FC<RequestTypeComponentProps> = ({ strings, types }) => {
  const [type, setType] = useState();

  const items = types.map(item => ({ label: strings[item.toLowerCase()], value: item }));

  const handlePress = () => {
    if (type) {
      console.log(type);
    }
  };

  return (
    <ScrollView style={layoutStyles.container}>
      <View style={{ ...layoutStyles.row, ...styles.row }}>
        <View style={layoutStyles.column1}>
          <Text style={typeStyles.header1}>{strings.request_credential}</Text>
          <Text style={typeStyles.paragraph}>{strings.request_credential_explanation}</Text>

          <DropDownPicker
            items={items}
            containerStyle={styles.containerStyle}
            style={styles.style}
            itemStyle={styles.itemStyle}
            dropDownStyle={styles.dropDownStyle}
            onChangeItem={item => setType(item.value)}
          />
        </View>
        <View style={layoutStyles.column1}>
          <SquareButton title={strings.confirm} onPress={handlePress} />
        </View>
      </View>
    </ScrollView>
  );
};


const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  row: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    // tab bar was set to 95px:
    height: screenHeight - 110,
  },
  first: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  second: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  containerStyle: {
    height: 56,
  },
  style: {
    backgroundColor: '#f1f1f1',
    borderColor: '#919191',
  },
  itemStyle: {
    justifyContent: 'flex-start',
  },
  dropDownStyle: {
    backgroundColor: '#fafafa',
  },
});

export default multilanguage(RequestTypeComponent);
