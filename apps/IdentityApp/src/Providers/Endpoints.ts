import { StorageProvider, STORAGE_KEYS } from './index';
import {
  ISSUER_ENDPOINT,
  TINYQR_ENDPOINT,
  IPFS_GATEWAY_ENDPOINT,
  DATA_VAULT_ENDPOINT,
  RSK_NODE,
} from '@env';

export const defaults = {
  issuer: ISSUER_ENDPOINT,
  tinyQr: TINYQR_ENDPOINT,
  ipfs: IPFS_GATEWAY_ENDPOINT,
  dataVault: DATA_VAULT_ENDPOINT,
  rskNode: RSK_NODE,
};

export const getEndpoint = (name: 'issuer' | 'tinyQr' | 'ipfs' | 'dataVault' | 'rskNode') =>
  StorageProvider.get(STORAGE_KEYS.END_POINTS)
    .then(res => res && JSON.parse(res))
    .then(json => json[name])
    .catch(() => defaults[name]);

export const getAllEndpoints = () =>
  StorageProvider.get(STORAGE_KEYS.END_POINTS)
    .then(res => res && JSON.parse(res))
    .catch(() => defaults);
