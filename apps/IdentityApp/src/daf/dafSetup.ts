import {
  RIFIdentityProvider,
  RIFIdKeyManagementSystem,
  MnemonicStore,
  Entities,
} from '@rsksmart/rif-id-daf';

import { DafResolver } from 'daf-resolver';
import * as Daf from 'daf-core';
import * as DidJwt from 'daf-did-jwt';
import { KeyManagementSystem, SecretBox } from 'daf-react-native-libsodium';

import * as W3c from 'daf-w3c';
import * as SD from 'daf-selective-disclosure';

import * as DIDComm from 'daf-did-comm';
import { createConnection, Connection } from 'typeorm';

export const dbConnection = createConnection({
  type: 'react-native',
  database: 'daf.sqlite',
  location: 'default',
  synchronize: true,
  entities: [...Entities, ...Daf.Entities],
  dropSchema: false,
  logging: ['error'],
});

const keyStore = new Daf.KeyStore(dbConnection);
const keyManagementSystem = new KeyManagementSystem(keyStore);
export const mnemonicStore = new MnemonicStore(dbConnection);
const rifIdKeyManagementSystem = new RIFIdKeyManagementSystem(
  keyManagementSystem,
  keyStore,
  mnemonicStore,
);

const identityStore = new Daf.IdentityStore('rsk-testnet', dbConnection);

export const rifIdentityProvider = new RIFIdentityProvider({
  kms: rifIdKeyManagementSystem,
  identityStore,
  network: 'rsk:testnet',
  rpcUrl: 'https://did.testnet.rsk.co:4444',
});

const didResolver = new DafResolver({
  networks: [
    {
      name: 'rsk:testnet',
      registry: '0xdca7ef03e98e0dc2b855be647c39abe984fcf21b',
      rpcUrl: 'https://did.testnet.rsk.co:4444',
    },
  ],
});

const messageHandler = new DIDComm.DIDCommMessageHandler();
messageHandler
  .setNext(new DidJwt.JwtMessageHandler())
  .setNext(new W3c.W3cMessageHandler())
  .setNext(new SD.SdrMessageHandler());

const actionHandler = new DIDComm.DIDCommActionHandler();
actionHandler.setNext(new W3c.W3cActionHandler()).setNext(new SD.SdrActionHandler());

export const agent = new Daf.Agent({
  dbConnection,
  didResolver,
  identityProviders: [rifIdentityProvider],
  actionHandler,
  messageHandler,
});

export const dropDafDb = () => {
  dbConnection.then((dbconn: Connection) => dbconn.dropDatabase());
};

export const resetMnemonicStore = async () => await mnemonicStore.delete();
