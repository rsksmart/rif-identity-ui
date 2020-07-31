export { default as StorageProvider } from './RNSecureStorageProvider';
export { STORAGE_KEYS } from './RNSecureStorageProvider';

export interface serverInterface {
  name: string;
  endpoint: string;
}

export const ISSUERS: serverInterface[] = [
  {
    name: "Ilan's Credentials",
    endpoint: 'http://decadc45cd5b.ngrok.io',
  },
];
