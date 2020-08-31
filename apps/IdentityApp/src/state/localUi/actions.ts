export enum LOCALUI_ACTION_TYPES {
  REQUEST_IS_SIGNED_IN = 'REQUEST_IS_SIGNED_IN',
  RECEIVE_IS_SIGNED_IN = 'RECEIVE_IS_SIGNED_IN',
  RECEIVE_LOGGED_IN = 'RECEIVE_LOGGED_IN',
  LOGOUT = 'LOGOUT',
}

export const requestIsSignedUp = () => ({
  type: LOCALUI_ACTION_TYPES.RECEIVE_IS_SIGNED_IN,
});

export const receiveIsSignedUp = (isSignedUp: boolean) => ({
  type: LOCALUI_ACTION_TYPES.RECEIVE_IS_SIGNED_IN,
  isSignedUp,
});

export const receiveLoggedIn = (isLoggedIn: boolean, loginError?: string) => ({
  type: LOCALUI_ACTION_TYPES.RECEIVE_LOGGED_IN,
  isLoggedIn,
  loginError,
});

export const logout = () => ({
  type: LOCALUI_ACTION_TYPES.LOGOUT,
});
