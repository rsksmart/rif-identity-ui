export enum SCAN_ACTION_TYPES {
  REQUEST_VERIFY_JWT = 'REQUEST_VERIFY_JWT',
  RECEIVE_INVALID_JWT = 'RECEIVE_INVALID_JWT',
  RECEIVE_VALID_JWT = 'RECEIVE_VALID_JWT'
}

export const requestVerifyJwt = () => ({
  type: SCAN_ACTION_TYPES.REQUEST_VERIFY_JWT,
  isVerifying: true,
})

export const receiveInvalidJwt = () => ({
  type: SCAN_ACTION_TYPES.RECEIVE_INVALID_JWT,
  isVerifying: false,
  validJwt: false,
})

export const receiveValidJwt = (presentation: any) => ({
  type: SCAN_ACTION_TYPES.RECEIVE_VALID_JWT,
  isVerifying: false,
  validJwt: true,
  presentation,
})