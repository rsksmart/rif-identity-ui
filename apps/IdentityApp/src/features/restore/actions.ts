export enum RESTORE_TYPES {
  REQUEST_RESTORE = 'REQUEST_RESTORE',
  RECEIVE_RESTORE = 'RECEIVE_RESTORE',
  MNEMONIC_ERROR = 'MNEMONIC_ERROR',
  REQUEST_DATA_VAULT = 'REQUEST_DATA_VAULT',
  REQUEST_IPFS = 'REQUEST_IPFS',
}

export const requestRestore = () => ({
  type: RESTORE_TYPES.REQUEST_RESTORE,
});

export const receiveRestore = () => ({
  type: RESTORE_TYPES.RECEIVE_RESTORE,
});

export const restoreSeedError = (mnemonicError: string) => ({
  type: RESTORE_TYPES.MNEMONIC_ERROR,
  mnemonicError,
});

export const requestDataVault = () => ({
  type: RESTORE_TYPES.REQUEST_DATA_VAULT,
});

export const requestFromIpfs = () => ({
  type: RESTORE_TYPES.REQUEST_IPFS,
});
