export enum MNEMONIC_TYPES {
  MNEMONIC_ERROR = 'MNEMONIC_ERROR',
  SET_MNEMONIC_ERROR = 'SET_MNEMONIC_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
  SAVE_MNEMONIC = 'SAVE_MNEMONIC',
  RECEIVE_MNEMONIC = 'RECEIVE_MNEMONIC',
}

export const clearError = () => ({
  type: MNEMONIC_TYPES.CLEAR_ERROR,
});

export const newMnemonicError = (message: string) => ({
  type: MNEMONIC_TYPES.MNEMONIC_ERROR,
  message,
});

export const receiveMnemonic = (hasMnemonic: boolean, mnemonic?: string[]) => ({
  type: MNEMONIC_TYPES.RECEIVE_MNEMONIC,
  hasMnemonic,
  mnemonic,
});
