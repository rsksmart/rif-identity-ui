import { StorageProvider, STORAGE_KEYS } from './index';
import config from '../config.json';

export const defaults = {
  issuer: config.ISSUER_ENDPOINT,
  issuerDid: config.ISSUER_DID,
  ipfs: config.IPFS_GATEWAY_ENDPOINT,
  dataVault: config.DATA_VAULT_ENDPOINT,
  rskNode: config.RSK_NODE,
  convey: config.CONVEY_URL,
  conveyDid: config.CONVEY_DID,
};

export const endpointsT = typeof defaults;

type Endpoint = 'issuer' | 'issuerDid' | 'ipfs' | 'dataVault' | 'rskNode' | 'convey' | 'conveyDid'
export const getEndpoint = (
  name: Endpoint,
) =>
  StorageProvider.get(STORAGE_KEYS.END_POINTS)
    .then(res => res && JSON.parse(res))
    .then(json => json[name])
    .catch(() => defaults[name]);

type EndpointMap = {
  [key in Endpoint]: string;
};
export const getAllEndpoints = (): Promise<EndpointMap> =>
  StorageProvider.get(STORAGE_KEYS.END_POINTS)
    .then(res => res && JSON.parse(res))
    .catch(() => defaults);
