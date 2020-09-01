export enum RESTORE_TYPES {
  REQUEST_RESTORE = 'REQUEST_RESTORE',
  RECEIVE_RESTORE = 'RECEIVE_RESTORE',
  REQUEST_DATA_VAULT = 'REQUEST_DATA_VAULT',
  ERROR_RESTORE = 'ERROR_RESTORE',
  REQUEST_IPFS = 'REQUEST_IPFS',
  ERROR_NO_IDENTITY = 'ERROR_NO_IDENTITY',
  CLOSE_ERROR_NO_IDENTITY = 'CLOSE_ERROR_NO_IDENTITY',
}

export const requestRestore = () => ({
  type: RESTORE_TYPES.REQUEST_RESTORE,
});

export const receiveRestore = () => ({
  type: RESTORE_TYPES.RECEIVE_RESTORE,
});

export const requestDataVault = () => ({
  type: RESTORE_TYPES.REQUEST_DATA_VAULT,
});

export const errorRestore = (message: string) => ({
  type: RESTORE_TYPES.ERROR_RESTORE,
  message,
});

export const requestFromIpfs = () => ({
  type: RESTORE_TYPES.REQUEST_IPFS,
});

export const errorNoIdentity = () => ({
  type: RESTORE_TYPES.ERROR_NO_IDENTITY,
});

export const closeErrorNoIdentity = () => ({
  type: RESTORE_TYPES.CLOSE_ERROR_NO_IDENTITY,
});
