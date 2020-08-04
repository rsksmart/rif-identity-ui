import { SETUP_ACTION_TYPES } from './actions';

export type SetupState = {
  pin: number | null;
  pinError: string | boolean;
};

export const initialState = {
  pin: null,
  pinError: false,
};

const reducer = (state: SetupState = initialState, action: any) => {
  switch (action.type) {
    case SETUP_ACTION_TYPES.MNEMONIC_ERROR:
      return {
        ...state,
        mnemonicError: action.message,
      };
    case SETUP_ACTION_TYPES.CLEAR_ERROR:
      return {
        ...state,
        pinError: initialState.pinError,
      };

    case SETUP_ACTION_TYPES.SET_PIN:
      return {
        ...state,
        pin: action.pin,
      };
    case SETUP_ACTION_TYPES.SET_PIN_ERROR:
      return {
        ...state,
        pinError: action.message,
      };
    default:
      return state;
  }
};

export default reducer;
