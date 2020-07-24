import { LOCALUI_ACTION_TYPES } from './actions';

type LocalUiState = {
  appVersion: string;
  checkingSingedUp: boolean;
  isSignedUp: boolean;
  isLoggedIn: boolean;
  loginError: string | null;
  did: string;
  address: string;
  privateKey: string;
};

export const initialState = {
  appVersion: '4',
  checkingSingedUp: true,
  isSignedUp: false,
  isLoggedIn: false,
  loginError: null,
  did: 'did:ethr:rsk:0x1234567801010101010101001',
  address: '0x46B9FFd5C5bDFb5800F1bdf1deD98463AFb0B66e',
  privateKey: '0x408f89abeca08043e74c01f951f428a4fd5206b10c383648171dc9d86812d2d8',
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
    default:
      return state;
  }
};

export default reducer;
