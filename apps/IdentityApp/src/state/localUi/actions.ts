export enum LOCALUI_ACTION_TYPES {
  REQUEST_IS_SIGNED_IN = 'REQUEST_IS_SIGNED_IN',
  RECEIVE_IS_SIGNED_IN = 'RECEIVE_IS_SIGNED_IN',
}

export const requestIsSignedIn = () => ({
  type: LOCALUI_ACTION_TYPES.RECEIVE_IS_SIGNED_IN,
});

export const receiveIsSignedIn = (isSignedIn: boolean) => ({
  type: LOCALUI_ACTION_TYPES.RECEIVE_IS_SIGNED_IN,
  isSignedIn,
});
