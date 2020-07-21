import { Credential } from './reducer';

export enum CREDENTIAL_ACTION_TYPES {
  REQUEST_ALL_CREDENTIALS = 'REQUEST_ALL_CREDENTIALS',
  RECEIVE_ALL_CREDENTIALS = 'RECEIVE_ALL_CREDENTIALS',
  REQUEST_CREDENTIAL = 'REQUEST_CREDENTIAL',
  RECEIVE_CREDENTAIL = 'RECEIVE_CREDENTAIL',
  REQUEST_ALL_PENDING_STATUS = 'REQUEST_ALL_PENDING_STATUS',
  RECEIVE_ALL_PENDING_STATUS = 'RECEIVE_ALL_PENDING_STATUS',
  UPDATE_CREDENTIAL = 'UPDATE_CREDENTIAL',
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

export const requestAllPendingStatus = () => ({
  type: CREDENTIAL_ACTION_TYPES.REQUEST_ALL_PENDING_STATUS,
});

export const receiveAllPendingStatus = (credentials: Credential[]) => ({
  type: CREDENTIAL_ACTION_TYPES.RECEIVE_ALL_PENDING_STATUS,
  credentials,
});

export const resetCredentials = () => ({
  type: CREDENTIAL_ACTION_TYPES.RESET,
});
