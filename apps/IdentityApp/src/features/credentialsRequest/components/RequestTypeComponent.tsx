import React, { useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { multilanguage } from 'redux-multilanguage';
import { Dimensions, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { serverInterface, credentialTypes } from '../../../Providers/Issuers';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';

interface RequestTypeComponentProps {
  strings: any;
  issuers: serverInterface[];
  navigation: any;
  profileIsLoaded: boolean;
}

const RequestTypeComponent: React.FC<RequestTypeComponentProps> = ({
  strings,
  issuers,
  navigation,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  // hardcode the first server:
  const server = issuers[0];

  const handlePress = (item: credentialTypes) => {
    navigation.navigate('ConfirmRequest', {
      type: item.name,
      requirements: item.requirements,
    });
  };

  return (
    <BackScreenComponent
      overrideBack={{ location: 'CredentialsFlow', params: { screen: 'CredentialsHome' } }}
      style={layout.container}>
      <View style={[layout.row, styles.row]}>
        <View style={layout.column1}>
          <Text style={typography.header1}>{strings.request_credential}</Text>
          <Text style={typography.paragraph}>{strings.request_credential_explanation}</Text>
          <View style={styles.credentialList}>
            {server.credentialsOffered?.map((item: credentialTypes, index: number) => (
              <TouchableOpacity
                key={item.name}
                style={[styles.credentialButton, index % 2 === 0 ? styles.odd : {}]}
                onPress={() => handlePress(item)}>
                <Text style={typography.paragraph}>{strings[item.name.toLowerCase()]}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </BackScreenComponent>
  );
};

const screenHeight = Math.round(Dimensions.get('window').height);
const styles = StyleSheet.create({
  row: {
    flexGrow: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: screenHeight - 110,
  },
  credentialList: {
    marginTop: 20,
  },
  credentialButton: {
    width: '100%',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 10,
  },
  odd: {
    backgroundColor: '#F0F0F0',
  },
});

export default multilanguage(RequestTypeComponent);
