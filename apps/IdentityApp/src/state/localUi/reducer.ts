import {LOCALUI_ACTION_TYPES} from './actions';
import sampleMnemonic from '../../screens/mnemonic/sampleMnemonic';

type LocalUiState = {
  sampleMnemonic: string[],
  mnemonicError: string | false;
  tempPin: number;
  setPinError: string | false;
};

export const initialState = {
  sampleMnemonic: sampleMnemonic,
  mnemonicError: false,
  tempPin: 0,
  setPinError: false,
};

const reducer = (state: LocalUiState = initialState, action: any) => {
  console.log('LocalUiReducer', action);
  switch (action.type) {
    case LOCALUI_ACTION_TYPES.MNEMONIC_ERROR:
      return {
        ...state,
        mnemonicError: action.message,
      };
    case LOCALUI_ACTION_TYPES.CLEAR_MNEMONIC_ERROR: 
      return {
        ...state,
        mnemonicError: initialState.mnemonicError,
      };

    case LOCALUI_ACTION_TYPES.SET_PIN:
      return {
        ...state,
        tempPin: action.pin,
      };
    case LOCALUI_ACTION_TYPES.SET_PIN_ERROR:
      return {
        ...state,
        setPinError: action.message,
      };
    default:
      return state;
  }
};

export default reducer;
