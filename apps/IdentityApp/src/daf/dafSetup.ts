import {
  RIFIdentityProvider,
  RIFIdKeyManagementSystem,
  SeedStore,
  Entities,
} from '@rsksmart/rif-id-daf';

import { DafResolver } from 'daf-resolver';
import * as Daf from 'daf-core';
import * as DidJwt from 'daf-did-jwt';
import { KeyManagementSystem } from 'daf-react-native-libsodium';

import * as W3c from 'daf-w3c';
import * as SD from 'daf-selective-disclosure';

import * as DIDComm from 'daf-did-comm';
import { createConnection } from 'typeorm';

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
const kms = new KeyManagementSystem(keyStore);
export const seedStore = new SeedStore(dbConnection);
const rifIdKeyManagementSystem = new RIFIdKeyManagementSystem(kms, seedStore);

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

/*
const secretKey = '29739248cad1bd1a0fc4d9b75cd4d2990de535baf5caadfdf8d8f86664aa830c';
const secretBox = new SecretBox(secretKey);
const keyManagementSystem = new KeyManagementSystem(new KeyStore(connection, secretBox));

const keyStore = new Daf.KeyStore(dbConnection)
const identityStore = new Daf.IdentityStore('rsk:testnet', dbConnection)
const kms = new KeyManagementSystem(keyStore)

const seedStore = new SeedStore(connection, secretBox);
const rifIdKeyManagementSystem = new RIFIdKeyManagementSystem(keyManagementSystem, seedStore);

export const identityProvider = new RIFIdentityProvider({
  kms: rifIdKeyManagementSystem,
  identityStore: new IdentityStore('rsk-testnet-ethr', connection),
  network: 'rsk:testnet',
  rpcUrl: 'https://did.testnet.rsk.co:4444',
});

export const agent = new Agent({
  dbConnection: connection,
  identityProviders: [identityProvider],
  didResolver: null,
});

export const deleteSeed = () => {
  console.log('deleting Seed!');
  const seedStore = new SeedStore(connection, secretBox);
  seedStore.delete();
  console.log('done');
};
*/
