import React, { useState, useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, RefreshControl, View, ScrollView, Text } from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import { Credential } from '../reducer';
import SingleSummaryComponent from './SingleSummaryComponent';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';
import { SquareButton } from '../../../Libraries/Button';
import { QRDetailsContainer } from '../containers';
import LoadingComponent from '../../../Libraries/Loading/LoadingComponent';
import MissingMnemonic from './MissingMnemonic';
import MessageComponent from '../../../Libraries/Message/MessageComponent';
import { Credential as RifCredential } from 'jesse-rif-id-core/src/reducers/credentials';

interface SummaryComponentProps {
  credentials: Credential[];
  issuedCredentials: () => RifCredential[];
  strings: any;
  navigation: any;
  isLoading: boolean;
  checkPending: () => {};
  createPresentation: (credentialHash: string) => {};
  isCheckingPendingStatus: boolean;
  hasMnemonic: boolean;
  hasPending: boolean;
  isRestoring: boolean;
}

const SummaryComponent: React.FC<SummaryComponentProps> = ({
  credentials,
  issuedCredentials,
  strings,
  navigation,
  isLoading,
  checkPending,
  isCheckingPendingStatus,
  createPresentation,
  hasMnemonic,
  hasPending,
}) => {
  const { layout, typography }: ThemeInterface = useContext(ThemeContext);
  const [qrModalHash, setQrModalHash] = useState<string | null>(null);

  const handleClick = (clickType: string, credentialHash: string) => {
    if (clickType === 'DETAILS') {
      return navigation.navigate('Details', { credentialHash: credentialHash });
    } else {
      createPresentation(credentialHash);
      setQrModalHash(credentialHash);
    }
  };

  const setUpMnemonic = () => {
    navigation.navigate('SignupFlow', { screen: 'MnemonicView' });
  };

  if (isLoading || !credentials) {
    return <LoadingComponent />;
  }

  return (
    <ScrollView
      style={layout.container}
      refreshControl={
        <RefreshControl refreshing={isCheckingPendingStatus} onRefresh={checkPending} />
      }>
      <View style={layout.row}>
        <View style={layout.column1}>
          <Text style={typography.header1}>{strings.my_credentials}</Text>
        </View>
      </View>

      {!hasMnemonic && <MissingMnemonic setUpMnemonic={setUpMnemonic} />}
      {hasPending && <MessageComponent message={strings.pull_down_refresh} type="WARNING" />}

      <Text>Issued Credentials:</Text>
      <View style={[layout.row, styles.credentialsRow]}>
        {issuedCredentials().map((credential: RifCredential) => (
          <View style={styles.single} key={credential.hash}>
            <SingleSummaryComponent
              type={credential.credentialSubject.type}
              status="CERTIFIED"
              credential={credential}
              onPress={async (clickType: string) => handleClick(clickType, credential.hash)}
              disabled={isCheckingPendingStatus}
            />
          </View>
        ))}
      </View>

      <Text>Old Credential Reducer:</Text>
      <View style={[layout.row, styles.credentialsRow]}>
        {credentials.length === 0 && (
          <Text style={typography.paragraph}>{strings.no_credentials}</Text>
        )}

        {credentials.map(credential => {
          if (credential.status.toString() !== 'CERTIFIED') {
            return (
              <View style={styles.single} key={credential.hash}>
                <SingleSummaryComponent
                  type={credential.type}
                  status={credential.status}
                  onPress={async (clickType: string) => console.log('click', clickType)}
                  disabled={isCheckingPendingStatus}
                />
              </View>
            );
          }
        })}
      </View>

      <ModalComponent visible={qrModalHash !== null}>
        <View style={layout.column1}>
          <QRDetailsContainer credentialHash={qrModalHash} />
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
