import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import moment from 'moment';

import { Credential } from '../reducer';
import StatusIcon from './StatusIcon';
import { layoutStyles, typeStyles } from '../../../styles';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import { SquareButton } from '../../../Libraries/Button';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';
import { QRDetailsContainer } from '../containers';

interface DetailsComponentProps {
  credential: Credential;
  strings: any;
}

const DetailsComponent: React.FC<DetailsComponentProps> = ({ credential, strings }) => {
  const [showQr, setShowQr] = useState<boolean>(false);

  return (
    <BackScreenComponent>
      <ScrollView style={layoutStyles.container}>
        <View style={layoutStyles.row}>
          <View style={layoutStyles.column1}>
            <Text style={typeStyles.header1}>
              {strings[credential.type.toLowerCase()]} <StatusIcon status={credential.status} />
            </Text>
          </View>
        </View>
        <View style={layoutStyles.row}>
          <View style={layoutStyles.column1}>
            <View style={styles.details}>
              <Text style={{ ...typeStyles.paragraph, ...typeStyles.bold }}>{strings.status}:</Text>
              <Text style={{ ...typeStyles.paragraph, ...styles.indent }}>
                {strings[credential.status.toLowerCase()]} <StatusIcon status={credential.status} />
              </Text>
              <Text style={[typeStyles.paragraph, typeStyles.bold]}>{strings.date_requested}:</Text>
              <Text style={[typeStyles.paragraph, styles.indent]}>
                {moment(credential.dateRequested).format('MMMM Do YYYY, h:mm a').toString()}
              </Text>

              <Text style={[typeStyles.paragraph, typeStyles.bold]}>Hash:</Text>
              <Text>{credential.hash}</Text>

              {credential.status === 'CERTIFIED' && (
                <View style={styles.buttonView}>
                  <SquareButton title="Show QR Code" onPress={() => setShowQr(true)} />
                  <ModalComponent visible={showQr}>
                    <View style={layoutStyles.column1}>
                      <QRDetailsContainer credentialId={credential.hash} />
                      <SquareButton
                        title={strings.close}
                        variation="hollow"
                        onPress={() => setShowQr(false)}
                      />
                    </View>
                  </ModalComponent>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>
    </BackScreenComponent>
  );
};

const styles = StyleSheet.create({
  details: {
    padding: 20,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  indent: {
    marginLeft: 20,
    marginBottom: 2,
    marginTop: 2,
  },
  buttonView: {
    marginTop: 10,
  },
});

export default multilanguage(DetailsComponent);
