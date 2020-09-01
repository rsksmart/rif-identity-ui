import { LOCALUI_ACTION_TYPES } from './actions';

type LocalUiState = {
  appVersion: string;
  checkingSingedUp: boolean;
  isSignedUp: boolean;
  isLoggedIn: boolean;
  loginError: string | null;
  privateKey: string;
};

export const initialState = {
  appVersion: '13',
  checkingSingedUp: true,
  isSignedUp: false,
  isLoggedIn: false,
  loginError: null,
};

const reducer = (state: LocalUiState = initialState, action: any) => {
  switch (action.type) {
    case LOCALUI_ACTION_TYPES.REQUEST_IS_SIGNED_IN:
      return {
        ...state,
        checkingSingedUp: true,
      };
    case LOCALUI_ACTION_TYPES.RECEIVE_IS_SIGNED_IN:
      return {
        ...state,
        checkingSingedUp: false,
        isSignedUp: action.isSignedUp,
      };
    case LOCALUI_ACTION_TYPES.RECEIVE_LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.isLoggedIn,
        loginError: action.loginError,
      };
    case LOCALUI_ACTION_TYPES.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export default reducer;
