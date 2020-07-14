import React from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import { typeStyles, layoutStyles } from '../../../styles';
import { Credential } from '../reducer';
import SingleSummaryComponent from './SingleSummaryComponent';

interface SummaryComponentProps {
  credentials: Credential[];
  strings: any;
  navigation: any;
}

const SummaryComponent: React.FC<SummaryComponentProps> = ({
  credentials,
  strings,
  navigation,
}) => {
  const handleClick = (clickType: string, credential: Credential) => {
    console.log("handlin' Click", clickType, credential);
    if (clickType === 'DETAILS') {
      // navigation.navigate('Details', {}, params: {  } );
      navigation.navigate('Details', { credential });
    }
  };

  return (
    <ScrollView style={layoutStyles.container}>
      <View style={layoutStyles.row}>
        <View style={layoutStyles.column1}>
          <Text style={typeStyles.header1}>{strings.my_credentials}</Text>
        </View>
      </View>
      <View style={{ ...layoutStyles.row, ...styles.credentialsRow }}>
        {credentials.map(credential => (
          <View style={styles.single} key={credential.id}>
            <SingleSummaryComponent
              credential={credential}
              onPress={async clickType => handleClick(clickType, credential)}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  credentialsRow: {
    marginLeft: 20,
  },
  single: {
    width: '50%',
    paddingLeft: 0,
    paddingRight: 20,
    paddingBottom: 20,
  },
});

export default multilanguage(SummaryComponent);
