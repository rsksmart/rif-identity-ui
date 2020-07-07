export enum LOCALUI_ACTION_TYPES {
  MNEMONIC_ERROR = 'MNEMONIC_ERROR',
  CLEAR_MNEMONIC_ERROR = 'CLEAR_MNEMONIC_ERROR',
  SET_PIN = 'SET_PIN',
  SET_PIN_ERROR = 'SET_PIN_ERROR',
}

export const clearMnemonicError = () => ({
  type: LOCALUI_ACTION_TYPES.CLEAR_MNEMONIC_ERROR,
});

export const newMnemonicError = (message: string) => ({
  type: LOCALUI_ACTION_TYPES.MNEMONIC_ERROR,
  message,
});

export const setPin = (pin: number) => ({
  type: LOCALUI_ACTION_TYPES.SET_PIN,
  pin,
});

export const setPinError = (message: string | false) => ({
  type: LOCALUI_ACTION_TYPES.SET_PIN_ERROR,
  message,
});
