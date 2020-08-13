import React, { useState, useContext } from 'react';
import ThemeContext, { ThemeInterface } from '@rsksmart/rif-theme';
import { StyleSheet, RefreshControl, View, ScrollView, Text, Button } from 'react-native';
import { multilanguage } from 'redux-multilanguage';
import { Credential } from '../reducer';
import SingleSummaryComponent from './SingleSummaryComponent';
import ModalComponent from '../../../Libraries/Modal/ModalComponent';
import { SquareButton } from '../../../Libraries/Button';
import { QRDetailsContainer } from '../containers';
import LoadingComponent from '../../../Libraries/Loading/LoadingComponent';
import MissingMnemonic from './MissingMnemonic';
import MessageComponent from '../../../Libraries/Message/MessageComponent';
import { StorageProvider, STORAGE_KEYS } from '../../../Providers';

import axios from 'axios'
import EthrDID from 'ethr-did'
import { Resolver } from 'did-resolver'
import { getResolver } from 'ethr-did-resolver'
import { createJWT } from 'did-jwt'
import { verifyCredential } from 'did-jwt-vc'

const resolver = new Resolver(getResolver({ networks: [{ name: "rsk:testnet", registry: "0xdca7ef03e98e0dc2b855be647c39abe984fcf21b", rpcUrl: 'https://did.testnet.rsk.co:4444' }] }))

interface SummaryComponentProps {
  credentials: Credential[];
  strings: any;
  navigation: any;
  isLoading: boolean;
  checkPending: () => {};
  createPresentation: (credentialHash: string) => {};
  isCheckingPendingStatus: boolean;
  hasMnemonic: boolean;
  hasPending: boolean;
}

const trace = (v: any) => { console.log(v); return v }

const getDid = () => StorageProvider.get(STORAGE_KEYS.IDENTITY)
  .then((res) => res && JSON.parse(res))
  .then(identity => new EthrDID({ address: identity.address, privateKey: identity.privateKey }))

const login = (did: string) => axios.post('https://684d82a314c9.ngrok.io/data-vault' + '/auth', { did })

const getLoginToken = (did: any) => login(did)
  .then(res => res.status === 200 && res.data)
  .then(jwt => verifyCredential(jwt, resolver))
  .then(({ verifiableCredential }) => (verifiableCredential.credentialSubject as any).token)
  .then(trace)

const loginAndSendClaimWithToken = (method:string) => (claim: any) => getDid().then(identity => {
    return getLoginToken(identity.did)
      .then(token => identity.signJWT({
        type: 'sdr',
        claims: [{ claimType: 'token', claimValue: token }, claim]
      }))
      .then(jwt => axios.post('https://684d82a314c9.ngrok.io/data-vault' + method, { jwt }))
      .then(res => res.status === 200 && res.data)
      .then(trace)
  })

const tryDataVaultLogin = () => loginAndSendClaimWithToken('/testAuth')(null)
const putInDataVault = (credentialJWT: string) => loginAndSendClaimWithToken('/put')({ claimType: 'content', claimValue: credentialJWT })
const getFromDataVault = () => loginAndSendClaimWithToken('/get')(null)

const getFromIPFS = (cid: string) => axios.get('https://ipfs.io/ipfs/' + cid).then(res => res.status === 200 && res.data)

const SummaryComponent: React.FC<SummaryComponentProps> = ({
  credentials,
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

  const [tryLoginResult, setTryLoginResult] = useState('')
  const [cid, setCid] = useState('')
  const [retrievedCid, setRetrievedCid] = useState('')
  const [retrievedData, setRetrievedData] = useState('')

  const tryLogin = () => {
    setTryLoginResult('')
    tryDataVaultLogin().then(setTryLoginResult).catch((error: any) => setTryLoginResult('Error: ' + error.message))
  }

  const put = () => {
    setCid('')
    putInDataVault('hello data vault').then(setCid).catch((error: any) => setCid('Error: ' + error.message))
  }

  const get = () => {
    setRetrievedCid('')
    getFromDataVault().then(cids => setRetrievedCid(cids[0])).catch((error: any) => setRetrievedCid('Error: ' + error.message))
  }

  const retrieve = () => {
    setRetrievedData('')
    getFromIPFS(retrievedCid).then(setRetrievedData).catch((error: any) => setRetrievedData('Error: ' + error.message))
  }
/*
  const putData = () => {
    setCid('')
    putInDataVault('some data').then(setCid)
  }*/

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

  if (isLoading) {
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

      <View style={[layout.row, styles.credentialsRow]}>
        {credentials.length === 0 && (
          <Text style={typography.paragraph}>{strings.no_credentials}</Text>
        )}

        {credentials.map(credential => (
          <View style={styles.single} key={credential.hash}>
            <SingleSummaryComponent
              credential={credential}
              onPress={async (clickType: string) => handleClick(clickType, credential.hash)}
              disabled={isCheckingPendingStatus}
            />
          </View>
        ))}
      </View>

      {hasMnemonic && <View style={styles.single}>
          <Text>Test data-vault</Text>
          <Button title="Try login" onPress={tryLogin} />
          <Button title="Store something" onPress={put} />
          <Button title="Retrieve that" onPress={get} />
          <Button title="Retrieve from IPFS" onPress={retrieve} />
          <Text>tryLoginResult: {tryLoginResult}</Text>
          <Text>cid: {cid}</Text>
          <Text>retrievedCid: {retrievedCid}</Text>
          <Text>retrievedData: {retrievedData}</Text>
        </View>
      }

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
