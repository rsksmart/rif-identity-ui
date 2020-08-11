import { MNEMONIC_TYPES } from './actions';

export type SetupState = {
  hasMnemonic: boolean;
  mnemonic: string[] | null;
  mnemonicError: string | null;
  newMnemonic: string[] | null;
};

export const initialState = {
  hasMnemonic: false,
  mnemonic: null,
  mnemonicError: false,
  newMnemonic: [],
};

const reducer = (state: SetupState = initialState, action: any) => {
  switch (action.type) {
    case MNEMONIC_TYPES.RECEIVE_MNEMONIC:
      return {
        ...state,
        hasMnemonic: action.hasMnemonic,
        mnemonic: action.mnemonic,
        mnemonicError: null,
      };
    case MNEMONIC_TYPES.MNEMONIC_ERROR:
      return {
        ...state,
        mnemonicError: action.mnemonicError,
      };
    case MNEMONIC_TYPES.SET_NEW_MNEMONIC:
      return {
        ...state,
        newMnemonic: action.mnemonic,
      };
    default:
      return state;
  }
};

export default reducer;
