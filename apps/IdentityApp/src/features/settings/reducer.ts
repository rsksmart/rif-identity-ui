import { SETTINGS_TYPES } from './actions';

export interface EndpointsInterface {
  issuer: string;
  tinyQr: string;
  ipfs: string;
  dataVault: string;
  rskNode: string;
}

export interface SettingsInterface {
  isAdvanced: boolean;
  isLoadingEndpoints: boolean;
  endpoints: EndpointsInterface | null;
  isSavingEndpoints: boolean;
}

export const initialState = {
  isAdvanced: false,
  isLoadingEndpoints: false,
  endpoints: null,
  isSavingEndpoints: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SETTINGS_TYPES.REQUEST_ENDPOINTS_STORAGE: {
      return {
        ...state,
        isLoadingEndpoints: true,
      };
    }
    case SETTINGS_TYPES.RECEIVE_ENDPOINTS_STORAGE: {
      return {
        ...state,
        isLoadingEndpoints: false,
        endpoints: action.endpoints,
      };
    }
    case SETTINGS_TYPES.REQUEST_SAVE_ENDPOINTS: {
      return {
        ...state,
        isSavingEndpoints: true,
      };
    }
    case SETTINGS_TYPES.RECEIVE_SAVE_ENDPOINTS: {
      return {
        ...state,
        isSavingEndpoints: false,
        endpoints: action.endpoints,
      };
    }
    default:
      return state;
  }
};

export default reducer;
