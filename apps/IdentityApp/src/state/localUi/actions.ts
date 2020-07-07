export enum LOCALUI_ACTION_TYPES {
  REQUEST_IS_SIGNED_IN = 'REQUEST_IS_SIGNED_IN',
  RECEIVE_IS_SIGNED_IN = 'RECEIVE_IS_SIGNED_IN',
}

export const requestIsSignedUp = () => ({
  type: LOCALUI_ACTION_TYPES.RECEIVE_IS_SIGNED_IN,
});

export const receiveIsSignedUp = (isSignedUp: boolean) => ({
  type: LOCALUI_ACTION_TYPES.RECEIVE_IS_SIGNED_IN,
  isSignedUp,
});
