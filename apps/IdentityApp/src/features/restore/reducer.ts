import { RESTORE_TYPES } from './actions';

interface StateInterface {
  isRestoring: boolean;
  mnemonicError: string | null;
  isGettingDataVault: boolean;
  isGettingIpfs: boolean;
  noIdentityError: boolean;
}

export const initialState = {
  isRestoring: false,
  mnemonicError: null,
  isGettingDataVault: false,
  isGettingIpfs: false,
  noIdentityError: false,
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
        isGettingDataVault: false,
        isGettingIpfs: false,
        noIdentityError: false,
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
        isGettingDataVault: true,
      };
    }

    case RESTORE_TYPES.REQUEST_IPFS: {
      return {
        ...state,
        isGettingIpfs: true,
      };
    }

    case RESTORE_TYPES.ERROR_NO_IDENTITY: {
      return {
        ...state,
        noIdentityError: true,
      };
    }

    case RESTORE_TYPES.CLOSE_ERROR_NO_IDENTITY: {
      return {
        ...state,
        isRestoring: false,
        noIdentityError: false,
        isGettingDataVault: false,
      };
    }

    default:
      return state;
  }
};

export default reducer;
