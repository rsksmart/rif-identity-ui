import axios from 'axios';
import EthrDID from 'ethr-did';
import { Resolver } from 'did-resolver';
import { getResolver } from 'ethr-did-resolver';
import { verifyCredential } from 'did-jwt-vc';
import { StorageProvider, STORAGE_KEYS } from './index';
import { getEndpoint } from './Endpoints';

const createResolver = async () =>
  getEndpoint('rskNode').then(
    rsk_endpoint =>
      new Resolver(
        getResolver({
          networks: [
            {
              name: 'rsk:testnet',
              registry: '0xdca7ef03e98e0dc2b855be647c39abe984fcf21b',
              rpcUrl: rsk_endpoint,
            },
          ],
        }),
      ),
  );

const trace = (v: any) => {
  console.log(v);
  return v;
};

const getDid = () =>
  StorageProvider.get(STORAGE_KEYS.IDENTITY)
    .then(res => res && JSON.parse(res))
    .then(identity => new EthrDID({ address: identity.address, privateKey: identity.privateKey }));

const login = (did: string) =>
  getEndpoint('dataVault').then(dataVaultEndpoint =>
    axios.post(dataVaultEndpoint + '/auth', { did }),
  );

const getLoginToken = (did: any) =>
  createResolver().then(resolver => {
    return login(did)
      .then(res => res.status === 200 && res.data)
      .then(jwt => verifyCredential(jwt, resolver))
      .then(({ verifiableCredential }) => (verifiableCredential.credentialSubject as any).token)
      .then(trace);
  });

const loginAndSendClaimWithToken = (method: string) => (claim: any) =>
  getDid().then(async identity => {
    const data_valut_endpoint = await getEndpoint('dataVault');
    return getLoginToken(identity.did)
      .then(token =>
        identity.signJWT({
          type: 'sdr',
          claims: [{ claimType: 'token', claimValue: token }, claim],
        }),
      )
      .then(jwt => axios.post(data_valut_endpoint + method, { jwt }))
      .then(res => res.status === 200 && res.data)
      .then(trace)
      .catch(err => console.log('data valut error', err.message));
  });

export const putInDataVault = (credentialJWT: string) =>
  loginAndSendClaimWithToken('/put')({ claimType: 'content', claimValue: credentialJWT });

export const getFromDataVault = () => loginAndSendClaimWithToken('/get')(null);

export const getFromIPFS = (cid: string) =>
  getEndpoint('ipfs').then(ipfsEndpoint =>
    axios.get(ipfsEndpoint + '/' + cid).then(res => res.status === 200 && res.data),
  );
