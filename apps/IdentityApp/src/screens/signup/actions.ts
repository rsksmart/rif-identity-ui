export enum SETUP_ACTION_TYPES {
  MNEMONIC_ERROR = 'MNEMONIC_ERROR',
  SET_PIN = 'SET_PIN',
  SET_PIN_ERROR = 'SET_PIN_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
}

export const clearError = () => ({
  type: SETUP_ACTION_TYPES.CLEAR_ERROR,
});

export const newMnemonicError = (message: string) => ({
  type: SETUP_ACTION_TYPES.MNEMONIC_ERROR,
  message,
});

export const setPin = (pin: number) => ({
  type: SETUP_ACTION_TYPES.SET_PIN,
  pin,
});

export const setPinError = (message: string) => ({
  type: SETUP_ACTION_TYPES.SET_PIN_ERROR,
  message,
});
