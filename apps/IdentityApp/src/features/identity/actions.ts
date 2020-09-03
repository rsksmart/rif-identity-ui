export enum MNEMONIC_TYPES {
  MNEMONIC_ERROR = 'MNEMONIC_ERROR',
  SET_MNEMONIC_ERROR = 'SET_MNEMONIC_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
  SAVE_MNEMONIC = 'SAVE_MNEMONIC',
  RECEIVE_MNEMONIC = 'RECEIVE_MNEMONIC',
  SET_NEW_MNEMONIC = 'SET_NEW_MNEMONIC',
  REQUEST_SAVE_IDENTITY = 'REQUEST_SAVE_IDENTITY',
  RECEIVE_SAVE_IDENTITY = 'RECEIVE_SAVE_IDENTITY',
  RECEIVE_IDENTITY = 'RECEIVE_IDENTITY',
}

export const clearError = () => ({
  type: MNEMONIC_TYPES.CLEAR_ERROR,
});

export const newMnemonicError = (mnemonicError: string) => ({
  type: MNEMONIC_TYPES.MNEMONIC_ERROR,
  mnemonicError,
});

export const receiveMnemonic = (mnemonic: string[] | null) => ({
  type: MNEMONIC_TYPES.RECEIVE_MNEMONIC,
  mnemonic,
});

export const setNewMnemnoic = (mnemonic: string[]) => ({
  type: MNEMONIC_TYPES.SET_NEW_MNEMONIC,
  mnemonic,
});

export const requestSaveIdentity = () => ({
  type: MNEMONIC_TYPES.REQUEST_SAVE_IDENTITY,
});

export const receiveSaveIdentity = (address: string, did: string) => ({
  type: MNEMONIC_TYPES.RECEIVE_SAVE_IDENTITY,
  address,
  did,
});

export const receiveIdentity = (address: string, did: string) => ({
  type: MNEMONIC_TYPES.RECEIVE_IDENTITY,
  address,
  did,
});
