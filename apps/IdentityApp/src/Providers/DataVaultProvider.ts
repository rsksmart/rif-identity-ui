import axios from 'axios';
import EthrDID from 'ethr-did';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import { verifyCredential } from 'did-jwt-vc';

import { DATA_VAULT_ENDPOINT, IPFS_GATEWAY_ENDPOINT, RSK_NODE } from '@env';
import { StorageProvider, STORAGE_KEYS } from './index';

// eslint-disable-next-line prettier/prettier
const resolver = new Resolver(getResolver({ networks: [{ name: 'rsk:testnet', registry: '0xdca7ef03e98e0dc2b855be647c39abe984fcf21b', rpcUrl: RSK_NODE }] }));

const trace = (v: any) => {
  console.log(v);
  return v;
};

const getDid = () =>
  StorageProvider.get(STORAGE_KEYS.IDENTITY)
    .then(res => res && JSON.parse(res))
    .then(identity => new EthrDID({ address: identity.address, privateKey: identity.privateKey }));

const login = (did: string) => axios.post(DATA_VAULT_ENDPOINT + '/auth', { did });

const getLoginToken = (did: any) =>
  login(did)
    .then(res => res.status === 200 && res.data)
    .then(jwt => verifyCredential(jwt, resolver))
    .then(({ verifiableCredential }) => (verifiableCredential.credentialSubject as any).token)
    .then(trace);

const loginAndSendClaimWithToken = (method: string) => (claim: any) =>
  getDid().then(identity => {
    console.log('method!', method);
    console.log(DATA_VAULT_ENDPOINT);
    return getLoginToken(identity.did)
      .then(token =>
        identity.signJWT({
          type: 'sdr',
          claims: [{ claimType: 'token', claimValue: token }, claim],
        }),
      )
      .then(jwt => axios.post(DATA_VAULT_ENDPOINT + method, { jwt }))
      .then(res => res.status === 200 && res.data)
      .then(trace)
      .catch(err => console.log('data valut error', err.message));
  });

/*
export const tryDataVaultLogin = () => loginAndSendClaimWithToken('/testAuth')(null);

export const tryLogin = () => {
  tryDataVaultLogin()
    .then(console.log('login successful!'))
    .catch((error: any) => console.log('Error: ' + error.message));
};
*/

export const putInDataVault = (credentialJWT: string) =>
  loginAndSendClaimWithToken('/put')({ claimType: 'content', claimValue: credentialJWT });

export const getFromDataVault = () => loginAndSendClaimWithToken('/get')(null);

export const getFromIPFS = (cid: string) =>
  axios.get(IPFS_GATEWAY_ENDPOINT + cid).then(res => res.status === 200 && res.data);

export const hello = () => console.log('hello!');
