import React, { useState, useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import moment from 'moment';

import { Credential } from '../reducer';
import StatusIcon from './StatusIcon';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import { SquareButton } from '../../../Libraries/Button';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';
import { QRDetailsContainer } from '../containers';
import JwtDataComponent from './JwtDataComponent';
import DeleteCredentialComponent from './DeleteCredentialComponent';

interface DetailsComponentProps {
  credential: Credential;
  strings: any;
  removeCredential: (hash: String) => {};
  createPresentation: (hash: String) => {};
}

const DetailsComponent: React.FC<DetailsComponentProps> = ({
  credential,
  removeCredential,
  createPresentation,
  strings,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [showQr, setShowQr] = useState<boolean>(false);

  const handleQrClick = () => {
    setShowQr(true);
    createPresentation(credential.hash);
  };
  // if the credential does not have a hash, show blank
  if (!credential) {
    return (
      <BackScreenComponent>
        <View style={layout.row}>
          <View style={layout.column1}>
            <Text style={typography.header1}>{strings.credential_removed}</Text>
          </View>
        </View>
      </BackScreenComponent>
    );
  }
  const paragraphIndent = [typography.paragraph, styles.indent];
  return (
    <BackScreenComponent>
      <ScrollView style={[layout.container, styles.mainScroll]}>
        <View style={layout.row}>
          <View style={layout.column1}>
            <Text style={typography.header1}>
              {strings[credential.type.toLowerCase()]} <StatusIcon status={credential.status} />
            </Text>
          </View>
        </View>
        <View style={layout.row}>
          <View style={layout.column1}>
            <View style={styles.details}>
              {credential.dateRequested && (
                <>
                  <Text style={typography.paragraphBold}>{strings.date_requested}:</Text>
                  <Text style={paragraphIndent}>
                    {moment(credential.dateRequested).format('MMMM Do YYYY, h:mm a').toString()}
                  </Text>
                </>
              )}

              {credential.jwt && <JwtDataComponent jwt={credential.jwt} />}

              <Text style={typography.paragraphBold}>{strings.status}:</Text>
              <Text style={paragraphIndent}>
                {strings[credential.status.toLowerCase()]}
                <StatusIcon status={credential.status} />
              </Text>
              {credential.status === 'CERTIFIED' && (
                <View style={styles.buttonView}>
                  <SquareButton title="Show QR Code" onPress={handleQrClick} />
                  <ModalComponent visible={showQr}>
                    <View style={layout.column1}>
                      <QRDetailsContainer credentialHash={credential.hash} />
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
            <DeleteCredentialComponent removeCredential={() => removeCredential(credential.hash)} />
          </View>
        </View>
      </ScrollView>
    </BackScreenComponent>
  );
};

const styles = StyleSheet.create({
  mainScroll: {
    marginBottom: 70,
  },
  details: {
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 20,
    paddingTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  indent: {
    marginLeft: 5,
    marginBottom: 2,
    marginTop: 2,
  },
  buttonView: {
    marginTop: 10,
  },
});

export default multilanguage(DetailsComponent);
