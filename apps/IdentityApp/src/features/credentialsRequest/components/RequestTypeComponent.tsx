import React, { useState, useEffect, useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { Dimensions, StyleSheet, ScrollView, View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { SquareButton } from '../../../Libraries/Button';
import { serverInterface, credentialTypes } from '../../../Providers/Issuers';

interface RequestTypeComponentProps {
  strings: any;
  issuers: serverInterface[];
  navigation: any;
  start: () => {};
}

const RequestTypeComponent: React.FC<RequestTypeComponentProps> = ({
  strings,
  issuers,
  navigation,
  start,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [type, setType] = useState();
  useEffect(() => {
    start();
  }, [start]);

  // hardcode the first server:
  const server = issuers[0];
  const items = server.credentialsOffered.map((item: credentialTypes) => ({
    label: strings[item.name.toLowerCase()],
    value: item.name,
  }));

  const handlePress = () => {
    if (type) {
      navigation.navigate('ConfirmRequest', {
        type: type,
        requirements: server.credentialsOffered.filter(
          (item: credentialTypes) => item.name === type,
        )[0].requirements,
      });
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
