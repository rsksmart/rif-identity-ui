export { default as StorageProvider } from './RNSecureStorageProvider';
export { STORAGE_KEYS } from './RNSecureStorageProvider';
//export const ISSUER_SERVER = 'http://192.168.0.13:3000';

export interface serverInterface {
  name: string;
  endpoint: string;
}

export const ISSUERS: serverInterface[] = [
  {
    name: 'Ministry of Issuance',
    endpoint: 'https://jesse-issuer-server.herokuapp.com',
  },
];
