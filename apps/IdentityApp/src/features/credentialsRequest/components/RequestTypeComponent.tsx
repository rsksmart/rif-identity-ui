import React, { useState, useEffect, useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { Dimensions, StyleSheet, ScrollView, View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SquareButton } from '../../../Libraries/Button';

interface RequestTypeComponentProps {
  strings: any;
  route: {
    params: {
      types: string[];
    };
  };
  navigation: any;
  start: () => {};
}

const RequestTypeComponent: React.FC<RequestTypeComponentProps> = ({
  strings,
  route,
  navigation,
  start,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [type, setType] = useState();
  useEffect(() => {
    start();
  }, [start]);

  const items = route.params.types.map(item => ({
    label: strings[item.toLowerCase()],
    value: item,
  }));

  const handlePress = () => {
    if (type) {
      navigation.navigate('ConfirmRequest', { type: type });
    }
  };

  return (
    <ScrollView style={layout.container}>
      <View style={[ layout.row, styles.row ]}>
        <View style={layout.column1}>
          <Text style={typography.header1}>{strings.request_credential}</Text>
          <Text style={typography.paragraph}>{strings.request_credential_explanation}</Text>

          <DropDownPicker
            items={items}
            containerStyle={styles.containerStyle}
            style={styles.style}
            itemStyle={styles.itemStyle}
            dropDownStyle={styles.dropDownStyle}
            onChangeItem={item => setType(item.value)}
          />
        </View>
        <View style={layout.column1}>
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
