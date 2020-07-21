import { Credential } from './reducer';

export enum CREDENTIAL_ACTION_TYPES {
  REQUEST_ALL_CREDENTIALS = 'REQUEST_ALL_CREDENTIALS',
  RECEIVE_ALL_CREDENTIALS = 'RECEIVE_ALL_CREDENTIALS',

  REQUEST_CREDENTIAL = 'REQUEST_CREDENTIAL',
  RECEIVE_CREDENTAIL = 'RECEIVE_CREDENTAIL',
  RESET = 'RESET',
}

export const requestCredential = () => ({
  type: CREDENTIAL_ACTION_TYPES.REQUEST_CREDENTIAL,
});

export const receiveCredential = (credential: Credential) => ({
  type: CREDENTIAL_ACTION_TYPES.RECEIVE_CREDENTAIL,
  credential,
});

export const requestAllCredentials = () => ({
  type: CREDENTIAL_ACTION_TYPES.REQUEST_ALL_CREDENTIALS,
});

export const receiveAllCredentials = (credentials: Credential[]) => ({
  type: CREDENTIAL_ACTION_TYPES.RECEIVE_ALL_CREDENTIALS,
  credentials,
});

export const resetCredentials = () => ({
  type: CREDENTIAL_ACTION_TYPES.RESET,
});
