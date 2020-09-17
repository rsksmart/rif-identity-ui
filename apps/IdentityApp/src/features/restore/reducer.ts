import { RESTORE_TYPES } from './actions';

interface StateInterface {
  isRestoring: boolean;
  restoreError: string | null;
  noIdentityError: boolean;
}

export const initialState = {
  isRestoring: false,
  restoreError: null,
  noIdentityError: false,
};

const reducer = (state: StateInterface = initialState, action: any) => {
  switch (action.type) {
    case RESTORE_TYPES.REQUEST_RESTORE: {
      return {
        ...state,
        isRestoring: true,
        restoreError: null,
        noIdentityError: false,
      };
    }
    case RESTORE_TYPES.RECEIVE_RESTORE: {
      return {
        ...state,
        isRestoring: false,
        noIdentityError: false,
      };
    }

    case RESTORE_TYPES.ERROR_RESTORE: {
      return {
        ...state,
        isRestoring: false,
        restoreError: action.message,
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
      };
    }

    default:
      return state;
  }
};

export default reducer;
