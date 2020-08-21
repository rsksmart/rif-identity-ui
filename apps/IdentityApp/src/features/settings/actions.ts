import { EndpointsInterface } from './reducer';

export enum SETTINGS_TYPES {
  TOGGLE_ADVANCED = 'TOGGLE_ADVANCED',
  REQUEST_ENDPOINTS_STORAGE = 'REQUEST_ENDPOINTS_STORAGE',
  RECEIVE_ENDPOINTS_STORAGE = 'RECEIVE_ENDPOINTS_STORAGE',
  REQUEST_SAVE_ENDPOINTS = 'REQUEST_SAVE_ENDPOINTS',
  RECEIVE_SAVE_ENDPOINTS = 'RECEIVE_SAVE_ENDPOINTS',
}

export const toggleAdvanced = (advanced: boolean) => ({
  type: SETTINGS_TYPES.TOGGLE_ADVANCED,
  advanced,
});

export const requestEndpointsStorage = () => ({
  type: SETTINGS_TYPES.REQUEST_ENDPOINTS_STORAGE,
});

export const receiveEndpointsStorage = (endpoints: EndpointsInterface) => ({
  type: SETTINGS_TYPES.RECEIVE_ENDPOINTS_STORAGE,
  endpoints,
});

export const requestSaveEndpoints = () => ({
  type: SETTINGS_TYPES.REQUEST_SAVE_ENDPOINTS,
});

export const receiveSaveEndpoints = (endponts: EndpointsInterface) => ({
  type: SETTINGS_TYPES.RECEIVE_SAVE_ENDPOINTS,
  endponts,
});
