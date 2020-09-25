export enum LOCALUI_ACTION_TYPES {
  REQUEST_SCAN_AGAIN = 'REQUEST_SCAN_AGAIN',
  RECEIVE_QR_SCAN = 'RECEIVE_QR_SCAN',
  REQUEST_CONVEY_LOGIN = 'REQUEST_CONVEY_LOGIN',
  RECEIVE_CONVEY_LOGIN = 'RECEIVE_CONVEY_LOGIN',
  ERROR_CONVEY_LOGIN = 'ERROR_CONVEY_LOGIN'
}

export const requestConveyLogin = () => ({
  type: LOCALUI_ACTION_TYPES.REQUEST_CONVEY_LOGIN,
})

export const receiveConveyLogin = () => ({
  type: LOCALUI_ACTION_TYPES.RECEIVE_CONVEY_LOGIN,
})

export const errorConveyLogin = (error: Error) => ({
  type: LOCALUI_ACTION_TYPES.ERROR_CONVEY_LOGIN,
  error,
})

export const requestScanAgain = () => ({
  type: LOCALUI_ACTION_TYPES.REQUEST_SCAN_AGAIN,
});

export const receiveQrScan = () => ({
  type: LOCALUI_ACTION_TYPES.RECEIVE_QR_SCAN,
});
