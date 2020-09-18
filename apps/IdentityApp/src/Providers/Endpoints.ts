import { StorageProvider, STORAGE_KEYS } from './index';
import {
  ISSUER_ENDPOINT,
  TINYQR_ENDPOINT,
  IPFS_GATEWAY_ENDPOINT,
  DATA_VAULT_ENDPOINT,
  RSK_NODE,
  CONVEY_URL,
  CONVEY_DID,
} from '@env';

export const defaults = {
  issuer: ISSUER_ENDPOINT,
  tinyQr: TINYQR_ENDPOINT,
  ipfs: IPFS_GATEWAY_ENDPOINT,
  dataVault: DATA_VAULT_ENDPOINT,
  rskNode: RSK_NODE,
  convey: CONVEY_URL,
  conveyDid: CONVEY_DID
};

export const getEndpoint = (name: 'issuer' | 'tinyQr' | 'ipfs' | 'dataVault' | 'rskNode' | 'convey' | 'conveyDid') =>
  StorageProvider.get(STORAGE_KEYS.END_POINTS)
    .then(res => res && JSON.parse(res))
    .then(json => json[name])
    .catch(() => defaults[name]);

export const getAllEndpoints = () =>
  StorageProvider.get(STORAGE_KEYS.END_POINTS)
    .then(res => res && JSON.parse(res))
    .catch(() => defaults);
