export enum SETUP_ACTION_TYPES {
  SET_PIN = 'SET_PIN',
  PIN_ERROR = 'PIN_ERROR',
  CLEAR_ERROR = 'CLEAR_ERROR',
}

export const clearError = () => ({
  type: SETUP_ACTION_TYPES.CLEAR_ERROR,
});

export const setPin = (pin: number) => ({
  type: SETUP_ACTION_TYPES.SET_PIN,
  pin,
});

export const pinError = (message: string | false) => ({
  type: SETUP_ACTION_TYPES.PIN_ERROR,
  message,
});
