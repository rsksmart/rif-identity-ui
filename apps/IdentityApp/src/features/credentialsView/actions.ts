import { Credential } from './reducer';

export enum CREDENTIAL_ACTION_TYPES {
  REQUEST_CREDENTIALS = 'REQUEST_CREDENTIALS',
  RECEIVE_CREDENTIALS = 'RECEIVE_CREDENTIALS',
  ADD_CREDENTIAL = 'ADD_CREDENTIAL',
}

export const addCredential = (credential: Credential) => ({
  type: CREDENTIAL_ACTION_TYPES.ADD_CREDENTIAL,
  credential,
});

export const requestCredentials = () => ({
  type: CREDENTIAL_ACTION_TYPES.REQUEST_CREDENTIALS,
});

export const receiveCredentials = (credentials: Credential[]) => ({
  type: CREDENTIAL_ACTION_TYPES.RECEIVE_CREDENTIALS,
  credentials,
});
