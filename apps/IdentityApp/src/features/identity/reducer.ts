import { MNEMONIC_TYPES } from './actions';

export type SetupState = {
  mnemonic: string[] | null;
  mnemonicError: string | null;
  newMnemonic: string[] | null;
  isSaving: boolean;
  address: string | null;
  did: string | null;
};

export const initialState = {
  mnemonic: null,
  mnemonicError: false,
  newMnemonic: [],
  isSaving: false,
  address: null,
  did: null,
};

const reducer = (state: SetupState = initialState, action: any) => {
  switch (action.type) {
    case MNEMONIC_TYPES.RECEIVE_MNEMONIC:
      return {
        ...state,
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

    case MNEMONIC_TYPES.REQUEST_SAVE_IDENTITY:
      return {
        ...state,
        mnemonicError: null,
        isSaving: true,
      };
    case MNEMONIC_TYPES.RECEIVE_SAVE_IDENTITY:
      return {
        ...state,
        isSaving: false,
        address: action.address,
        did: action.did,
      };
    case MNEMONIC_TYPES.RECEIVE_IDENTITY:
      return {
        ...state,
        address: action.address,
        did: action.did,
      };
    default:
      return state;
  }
};

export default reducer;
