import { RESTORE_TYPES } from './actions';

interface hashInterface {
  isLoading: boolean;
}

interface StateInterface {
  isRestoring: boolean;
  mnemonicError: string | null;
  isGettingCredentials: boolean;
  hashes: string[];
}

export const initialState = {
  isRestoring: false,
  mnemonicError: null,
  isGettingCredentials: false,
  hashes: [],
};

const reducer = (state: StateInterface = initialState, action: any) => {
  switch (action.type) {
    case RESTORE_TYPES.REQUEST_RESTORE: {
      return {
        ...state,
        isRestoring: true,
      };
    }
    case RESTORE_TYPES.RECEIVE_RESTORE: {
      return {
        ...state,
        isRestoring: false,
      };
    }
    case RESTORE_TYPES.MNEMONIC_ERROR: {
      return {
        ...state,
        mnemonicError: action.mnemonicError,
        isRestoring: false,
      };
    }

    case RESTORE_TYPES.REQUEST_DATA_VAULT: {
      return {
        ...state,
        isGettingCredentials: true,
      };
    }
    case RESTORE_TYPES.RECEIVE_DATA_VAULT: {
      return {
        ...state,
        isGettingCredentials: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;
