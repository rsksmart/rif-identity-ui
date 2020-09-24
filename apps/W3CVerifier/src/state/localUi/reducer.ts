import { LOCALUI_ACTION_TYPES } from './actions';

type LocalUiState = {
  allowScanAgain: boolean,
  loggingInToConvey: boolean,
  loggedInToConvey: boolean,
  errorConveyLogin: boolean,
};

export const initialState = {
  allowScanAgain: true,
  loggingInToConvey: false,
  loggedInToConvey: false,
  errorConveyLogin: false,
};

const reducer = (state: LocalUiState = initialState, action: any) => {
  switch (action.type) {
    case LOCALUI_ACTION_TYPES.REQUEST_SCAN_AGAIN:
      return {
        ...state,
        allowScanAgain: true,
      };
    case LOCALUI_ACTION_TYPES.RECEIVE_QR_SCAN:
      return {
        ...state,
        allowScanAgain: false,
      };
    case LOCALUI_ACTION_TYPES.REQUEST_CONVEY_LOGIN:
      return {
        ...state,
        loggingInToConvey: true,
        errorConveyLogin: false,
        loggedInToConvey: false,
      };
    case LOCALUI_ACTION_TYPES.RECEIVE_CONVEY_LOGIN:
      return {
        ...state,
        loggingInToConvey: false,
        errorConveyLogin: false,
        loggedInToConvey: true,
      };
    case LOCALUI_ACTION_TYPES.ERROR_CONVEY_LOGIN:
      return {
        ...state,
        loggingInToConvey: false,
        errorConveyLogin: true,
        loggedInToConvey: false,
        error: action.error,
      };
    default:
      return state;
  }
};

export default reducer;
