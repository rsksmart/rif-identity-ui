import React, { useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import { typeStyles, layoutStyles } from '../../../styles';
import { Credential } from '../reducer';
import SingleSummaryComponent from './SingleSummaryComponent';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';
import { SquareButton } from '../../../Libraries/Button';
import { QRDetailsContainer } from '../containers';

interface SummaryComponentProps {
  credentials: Credential[];
  strings: any;
  navigation: any;
  isLoading: boolean;
}

const SummaryComponent: React.FC<SummaryComponentProps> = ({
  credentials,
  strings,
  navigation,
}) => {
  const [qrModalId, setQrModalId] = useState(0);
  const handleClick = (clickType: string, credentialId: number) => {
    if (clickType === 'DETAILS') {
      return navigation.navigate('Details', { credentialId: credentialId });
    } else {
      setQrModalId(credentialId);
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
              onPress={async clickType => handleClick(clickType, credential.id)}
            />
          </View>
        ))}
      </View>

      <ModalComponent visible={qrModalId !== 0}>
        <View style={layoutStyles.column1}>
          <QRDetailsContainer credentialId={qrModalId} />
          <SquareButton title={strings.close} variation="hollow" onPress={() => setQrModalId(0)} />
        </View>
      </ModalComponent>
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
