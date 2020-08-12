import { LOCALUI_ACTION_TYPES } from './actions';

type LocalUiState = {
  allowScanAgain: boolean
};

export const initialState = {
  allowScanAgain: true,
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
    default:
      return state;
  }
};

export default reducer;
