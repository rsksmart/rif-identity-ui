import { createConnection } from 'typeorm';
import { Entities as DAFEntities, KeyStore, IdentityStore, Agent } from 'daf-core';
import { SecretBox, KeyManagementSystem } from 'daf-libsodium';
import {
  RIFIdentityProvider,
  RIFIdKeyManagementSystem,
  SeedStore,
  Entities,
} from '@rsksmart/rif-id-daf';

const connection = createConnection({
  type: 'react-native',
  database: 'daf.sqlite',
  location: 'default',
  synchronize: true,
  entities: [...Entities, ...DAFEntities],
  logging: ['error'],
});

const secretKey = '29739248cad1bd1a0fc4d9b75cd4d2990de535baf5caadfdf8d8f86664aa830c';
const secretBox = new SecretBox(secretKey);
const keyManagementSystem = new KeyManagementSystem(new KeyStore(connection, secretBox));

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
