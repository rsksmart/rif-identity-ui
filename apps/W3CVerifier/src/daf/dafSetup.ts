import { DafResolver } from 'daf-resolver';
import * as Daf from 'daf-core';
import * as DidJwt from 'daf-did-jwt';
import { KeyManagementSystem } from 'daf-react-native-libsodium';
import { IdentityProvider } from 'daf-ethr-did'

import * as W3c from 'daf-w3c';

import { createConnection, Connection } from 'typeorm';
import { RPC_URL, NETWORK, DID_REGISTRY_ADDRESS } from '../../env.json'

export const dbConnection = createConnection({
  type: 'react-native',
  database: 'daf.sqlite',
  location: 'default',
  synchronize: true,
  entities: [...Daf.Entities],
  dropSchema: false,
  logging: ['error'],
});

const keyStore = new Daf.KeyStore(dbConnection)
const kms = new KeyManagementSystem(keyStore)
const identityStore = new Daf.IdentityStore('verifier-rsk', dbConnection)

export const identityProvider = new IdentityProvider({
  kms,
  identityStore,
  network: NETWORK,
  rpcUrl: RPC_URL
})

const didResolver = new DafResolver({
  networks: [
    {
      name: NETWORK,
      registry: DID_REGISTRY_ADDRESS,
      rpcUrl: RPC_URL,
    },
  ],
});

const messageHandler = new DidJwt.JwtMessageHandler()
messageHandler.setNext(new W3c.W3cMessageHandler())

const actionHandler = new W3c.W3cActionHandler()

export const agent = new Daf.Agent({
  dbConnection,
  didResolver,
  identityProviders: [identityProvider],
  actionHandler,
  messageHandler,
});

export const dropDafDb = () => {
  dbConnection.then((dbconn: Connection) => dbconn.dropDatabase());
};
