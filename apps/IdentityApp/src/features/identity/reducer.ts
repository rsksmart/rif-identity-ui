import { MNEMONIC_TYPES } from './actions';
import sample from './sampleMnemonic';

export type SetupState = {
  hasMnemonic: boolean;
  mnemonic: string[] | null;
  mnemonicError: string | null;
  newMnemonic: string[];
};

export const initialState = {
  hasMnemonic: false,
  mnemonic: null,
  mnemonicError: false,
  newMnemonic: sample,
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
    default:
      return state;
  }
};

export default reducer;
