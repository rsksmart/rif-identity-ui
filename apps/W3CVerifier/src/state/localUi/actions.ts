export enum LOCALUI_ACTION_TYPES {
  REQUEST_SCAN_AGAIN = 'REQUEST_SCAN_AGAIN',
  RECEIVE_QR_SCAN = 'RECEIVE_QR_SCAN',
}

export const requestScanAgain = () => ({
  type: LOCALUI_ACTION_TYPES.REQUEST_SCAN_AGAIN,
});

export const receiveQrScan = () => ({
  type: LOCALUI_ACTION_TYPES.RECEIVE_QR_SCAN,
});
