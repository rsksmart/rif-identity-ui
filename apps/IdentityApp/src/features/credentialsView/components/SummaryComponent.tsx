import React, { useState, useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, RefreshControl, View, ScrollView, Text } from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import SingleSummaryComponent from './SingleSummaryComponent';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';
import { SquareButton } from '../../../Libraries/Button';
import MissingMnemonic from './MissingMnemonic';
import MessageComponent from '../../../Libraries/Message/MessageComponent';
import { Credential as RifCredential } from '@rsksmart/rif-id-core/src/reducers/credentials';
import { IssuedCredentialRequest } from '@rsksmart/rif-id-core/lib/reducers/issuedCredentialRequests';
import { CredentialRequestInput } from 'daf-selective-disclosure';
import QRCode from 'react-native-qrcode-svg';
import LoadingComponent from '../../../Libraries/Loading/LoadingComponent';

interface SummaryComponentProps {
  issuedCredentials: RifCredential[];
  requestedCredentials: IssuedCredentialRequest[];
  strings: any;
  navigation: any;
  checkPending: () => Promise<any>[];
  createPresentation: (credentialHash: string) => Promise<any>;
  hasMnemonic: boolean;
}

const SummaryComponent: React.FC<SummaryComponentProps> = ({
  issuedCredentials,
  requestedCredentials,
  strings,
  navigation,
  checkPending,
  createPresentation,
  hasMnemonic,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [qrModalHash, setQrModalHash] = useState<string | null>(null);
  const [isCheckingPendingStatus, setIsCheckingPendingStatus] = useState<boolean>(false);

  const hasPending =
    requestedCredentials.filter((item: any) => item.status === 'pending').length !== 0;

  const handleClick = (
    reducer: 'REQUESTED' | 'ISSUED',
    clickType: string,
    credentialIdentifier: string,
  ) => {
    if (clickType === 'DETAILS') {
      return navigation.navigate('Details', { credentialIdentifier, reducer });
    } else {
      createPresentation(credentialIdentifier).then((response: string) => setQrModalHash(response));
    }
  };

  const handleCheckPendingStatus = async () => {
    if (!hasPending) {
      return;
    }
    setIsCheckingPendingStatus(true);
    await checkPending();
    setIsCheckingPendingStatus(false);
  };

  const setUpMnemonic = () => {
    navigation.navigate('SignupFlow', { screen: 'MnemonicView' });
  };

  return (
    <ScrollView
      style={layout.container}
      refreshControl={
        <RefreshControl refreshing={isCheckingPendingStatus} onRefresh={handleCheckPendingStatus} />
      }>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.header1}>{strings.my_credentials}</Text>
        </View>
      </View>

      {!hasMnemonic && <MissingMnemonic setUpMnemonic={setUpMnemonic} />}
      {requestedCredentials.length === 0 && issuedCredentials.length === 0 && hasMnemonic && (
        <MessageComponent message={strings.no_credentials} type="WARNING" />
      )}

      {hasPending && !isCheckingPendingStatus && (
        <MessageComponent message={strings.pull_down_refresh} type="WARNING" />
      )}
      {isCheckingPendingStatus && (
        <MessageComponent message="Checking status of credentials, please wait." type="WARNING" />
      )}

      <View style={[layout.row, styles.credentialsRow]}>
        {requestedCredentials.map((credential: IssuedCredentialRequest) => (
          <View style={styles.single} key={credential.id}>
            <SingleSummaryComponent
              type={
                credential.claims.find((item: CredentialRequestInput) => item.claimType === 'type')
                  .claimValue
              }
              status={credential.status.toUpperCase()}
              onPress={async (clickType: string) =>
                handleClick('REQUESTED', clickType, credential.id)
              }
              disabled={isCheckingPendingStatus}
            />
          </View>
        ))}

        {issuedCredentials.map((credential: RifCredential) => (
          <View style={styles.single} key={credential.hash}>
            <SingleSummaryComponent
              type={credential.credentialSubject.type}
              status="CERTIFIED"
              onPress={async (clickType: string) =>
                handleClick('ISSUED', clickType, credential.hash)
              }
              disabled={isCheckingPendingStatus}
            />
          </View>
        ))}
      </View>

      <ModalComponent visible={qrModalHash !== null}>
        <View style={layout.column1}>
          <Text>{qrModalHash}</Text>
          <SquareButton
            title={strings.close}
            variation="hollow"
            onPress={() => setQrModalHash(null)}
          />
        </View>
      </ModalComponent>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  credentialsRow: {
    marginLeft: 10,
  },
  single: {
    width: '50%',
    paddingLeft: 0,
    paddingRight: 20,
    paddingBottom: 20,
  },
});

export default multilanguage(SummaryComponent);
