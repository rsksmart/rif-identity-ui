export enum MNEMONIC_TYPES {
  MNEMONIC_ERROR = 'MNEMONIC_ERROR',
  SET_MNEMONIC_ERROR = 'SET_MNEMONIC_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
  SAVE_MNEMONIC = 'SAVE_MNEMONIC',
  RECEIVE_MNEMONIC = 'RECEIVE_MNEMONIC',
  SET_NEW_MNEMONIC = 'SET_NEW_MNEMONIC',
}

export const clearError = () => ({
  type: MNEMONIC_TYPES.CLEAR_ERROR,
});

export const newMnemonicError = (mnemonicError: string) => ({
  type: MNEMONIC_TYPES.MNEMONIC_ERROR,
  mnemonicError,
});

export const receiveMnemonic = (hasMnemonic: boolean, mnemonic?: string[]) => ({
  type: MNEMONIC_TYPES.RECEIVE_MNEMONIC,
  hasMnemonic,
  mnemonic,
});

export const restoreSeedError = (mnemonicError: string) => ({
  type: MNEMONIC_TYPES.MNEMONIC_ERROR,
  mnemonicError,
});

export const setNewMnemnoic = (mnemonic: string[]) => ({
  type: MNEMONIC_TYPES.SET_NEW_MNEMONIC,
  mnemonic,
})