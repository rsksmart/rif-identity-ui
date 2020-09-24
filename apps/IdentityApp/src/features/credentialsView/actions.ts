import { Credential } from './reducer';

export enum CREDENTIAL_ACTION_TYPES {
  REQUEST_ALL_CREDENTIALS = 'REQUEST_ALL_CREDENTIALS',
  RECEIVE_ALL_CREDENTIALS = 'RECEIVE_ALL_CREDENTIALS',

  REQUEST_CREDENTIAL = 'REQUEST_CREDENTIAL',
  RECEIVE_CREDENTAIL = 'RECEIVE_CREDENTAIL',
  ERROR_REQUEST_CREDENTIAL = 'ERROR_REQUEST_CREDENTIAL',

  REQUEST_PRESENTATION = 'REQUEST_PRESENTATION',
  RECEIVE_PRESENTATION = 'RECEIVE_PRESENTATION',
  ERROR_RECEIVE_PRESENTATION = 'ERROR_RECEIVE_PRESENTATION',

  REQUEST_ALL_PENDING_STATUS = 'REQUEST_ALL_PENDING_STATUS',
  RECEIVE_ALL_PENDING_STATUS = 'RECEIVE_ALL_PENDING_STATUS',
  RESET = 'RESET',
}

export const requestCredential = () => ({
  type: CREDENTIAL_ACTION_TYPES.REQUEST_CREDENTIAL,
});

export const receiveCredential = (credential: Credential) => ({
  type: CREDENTIAL_ACTION_TYPES.RECEIVE_CREDENTAIL,
  credential,
});

export const errorRequestCredential = (message: string) => ({
  type: CREDENTIAL_ACTION_TYPES.ERROR_REQUEST_CREDENTIAL,
  message,
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

export const requestPresentation = () => ({
  type: CREDENTIAL_ACTION_TYPES.REQUEST_PRESENTATION,
});

export const receivePresentation = (presentationUri: string) => ({
  type: CREDENTIAL_ACTION_TYPES.RECEIVE_PRESENTATION,
  presentationUri,
});

export const errorReceivePresentation = () => ({
  type: CREDENTIAL_ACTION_TYPES.ERROR_RECEIVE_PRESENTATION,
});

export const resetCredentials = () => ({
  type: CREDENTIAL_ACTION_TYPES.RESET,
});
