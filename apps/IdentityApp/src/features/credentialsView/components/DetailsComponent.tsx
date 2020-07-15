import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import { Credential } from '../reducer';
import { ScrollView } from 'react-native-gesture-handler';
import StatusIcon from './StatusIcon';
import { layoutStyles, typeStyles } from '../../../styles';
import DisplayItem from '../../profile/components/DisplayItem';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import { SquareButton } from '../../../Libraries/Button';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';
import QRDetailsComponent from './QRDetailsComponent';

interface DetailsComponentProps {
  route: {
    key: string;
    name: string;
    params: {
      credential: Credential;
    };
  };
  strings: any;
}

const DetailsComponent: React.FC<DetailsComponentProps> = ({ route, strings }) => {
  const credential = route.params.credential;
  const [showQr, setShowQr] = useState<boolean>(false);

  return (
    <BackScreenComponent>
      <ScrollView style={layoutStyles.container}>
        <View style={layoutStyles.row}>
          <View style={layoutStyles.column1}>
            <Text style={typeStyles.header1}>
              {credential.name} <StatusIcon status={credential.status} />
            </Text>
          </View>
        </View>
        <View style={layoutStyles.row}>
          <View style={layoutStyles.column1}>
            <View style={styles.details}>
              <DisplayItem name={strings.issuer} value={credential.issuer.name} />
              <Text style={{ ...typeStyles.paragraph, ...typeStyles.bold }}>
                {strings.information_shared}:
              </Text>
              {credential.infoShared.map(item => (
                <Text style={{ ...typeStyles.paragraph, ...styles.indent }} key={item}>
                  {item}
                </Text>
              ))}
              <Text style={{ ...typeStyles.paragraph, ...typeStyles.bold }}>{strings.status}:</Text>
              <Text style={{ ...typeStyles.paragraph, ...styles.indent }}>
                {strings[credential.status.toLowerCase()]} <StatusIcon status={credential.status} />
              </Text>
            </View>
          </View>
        </View>
        {credential.status === 'CERTIFIED' && (
          <View style={layoutStyles.row}>
            <View style={layoutStyles.column1}>
              <SquareButton title="Show QR Code" onPress={() => setShowQr(true)} />

              <ModalComponent visible={showQr}>
                <View style={layoutStyles.column1}>
                  <QRDetailsComponent credential={credential} />
                  <SquareButton
                    title={strings.close}
                    variation="hollow"
                    onPress={() => setShowQr(false)}
                  />
                </View>
              </ModalComponent>
            </View>
          </View>
        )}
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
});

export default multilanguage(DetailsComponent);
