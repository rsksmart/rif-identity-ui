import { StorageProvider, STORAGE_KEYS } from './index';
import config from '../config.json';

export const defaults = {
  issuer: config.ISSUER_ENDPOINT,
  tinyQr: config.TINYQR_ENDPOINT,
  ipfs: config.IPFS_GATEWAY_ENDPOINT,
  dataVault: config.DATA_VAULT_ENDPOINT,
  rskNode: config.RSK_NODE,
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
