import React, { useState, useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, ScrollView, Text, View } from 'react-native';
import { multilanguage } from 'redux-multilanguage';

import { Credential as RifCredential } from '@rsksmart/rif-id-core/src/reducers/credentials';
import StatusIcon from './StatusIcon';
import BackScreenComponent from '../../../Libraries/BackScreen/BackScreenComponent';
import { SquareButton } from '../../../Libraries/Button';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';
import ClaimsDataComponent from './ClaimsDataComponent';
import DeleteCredentialComponent from './DeleteCredentialComponent';
import { IssuedCredentialRequest } from '@rsksmart/rif-id-core/lib/reducers/issuedCredentialRequests';
import { CredentialRequestInput } from 'daf-selective-disclosure';
import { CopyButton } from '../../../Libraries/CopyButton';

interface DetailsComponentProps {
  getCredential: () => RifCredential;
  getCredentialRequest: () => IssuedCredentialRequest;
  strings: any;
  removeCredential: (
    credential: RifCredential,
    issuedCredential: IssuedCredentialRequest,
  ) => Boolean;
  createPresentation: (hash: string) => Promise<any>;
}

const DetailsComponent: React.FC<DetailsComponentProps> = ({
  getCredential,
  getCredentialRequest,
  removeCredential,
  createPresentation,
  strings,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [showQr, setShowQr] = useState<string | null>(null);

  const credential = getCredential();
  const credentialRequest = getCredentialRequest();

  const handleQrClick = () => {
    createPresentation(credential.hash)
      .then(response => {
        setShowQr(response);
      });
  };

  // if the credential does not exist, show the delete screen.
  if (!credential && !credentialRequest) {
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
  const type = credentialRequest
    ? credentialRequest.claims.find((item: CredentialRequestInput) => item.claimType === 'type')
        .claimValue
    : credential.credentialSubject.type;
  const status = credentialRequest ? credentialRequest.status.toUpperCase() : 'CERTIFIED';
  const issuer = credential ? credential.issuer : credentialRequest.to;
  const subject = credential ? credential.subject : credentialRequest.from;
  const claims = credential ? credential.credentialSubject.otherClaims : credentialRequest.claims;

  return (
    <BackScreenComponent>
      <ScrollView style={[layout.container, styles.mainScroll]}>
        <View style={layout.row}>
          <View style={layout.column1}>
            <Text style={typography.header1}>
              {strings[type.toLowerCase()]} <StatusIcon status={status} />
            </Text>
          </View>
        </View>
        <View style={layout.row}>
          <View style={layout.column1}>
            <View style={styles.details}>
              <Text style={typography.paragraphBold}>{strings.status}:</Text>
              <Text style={paragraphIndent}>
                {strings[status.toLowerCase()]}
                <StatusIcon status={status} />
              </Text>

              <ClaimsDataComponent claims={claims} />

              <Text style={[typography.paragraphBold, styles.noMargin]}>{strings.issuer}:</Text>
              <CopyButton value={issuer} />

              <Text style={[typography.paragraphBold, styles.noMargin]}>{strings.subject}:</Text>
              <CopyButton value={subject} />

              {credential && (
                <>
                  <Text style={typography.paragraphBold}>{strings.issuance_date}:</Text>
                  <Text style={styles.did}>
                    {new Date(credential.issuanceDate).toLocaleString()}
                  </Text>
                  <Text style={typography.paragraphBold}>{strings.expiration_date}:</Text>
                  <Text style={styles.did}>
                    {new Date(credential.expirationDate).toLocaleString()}
                  </Text>
                </>
              )}

              {status === 'CERTIFIED' && (
                <View style={styles.buttonView}>
                  <SquareButton title="Show QR Code" onPress={handleQrClick} />
                  <ModalComponent visible={showQr !== null}>
                    <View style={layout.column1}>
                      <Text>{showQr}</Text>
                      <SquareButton
                        title={strings.close}
                        variation="hollow"
                        onPress={() => setShowQr(null)}
                      />
                    </View>
                  </ModalComponent>
                </View>
              )}
            </View>

            <DeleteCredentialComponent
              removeCredential={() => removeCredential(credential, credentialRequest)}
            />
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
  noMargin: {
    marginBottom: 0,
  },
  did: {
    fontSize: 16,
    paddingLeft: 5,
  },
});

export default multilanguage(DetailsComponent);
