import mockData from './mockData.json';
import { CREDENTIAL_ACTION_TYPES } from './actions';

export enum CredentialTypes {
  AUTO = 'AUTO',
  PASSPORT = 'PASSPORT',
  ID = 'ID',
}

export enum CredentialStatus {
  CERTIFIED = 'CERTIFIED',
  PENDING = 'PENDING',
  DENIED = 'DENIED',
}

export interface IssuerInterface {
  name: string;
}

export interface Credential {
  id: number;
  name: string;
  type: CredentialTypes;
  status: CredentialStatus;
  infoShared: string[];
  issuer: IssuerInterface;
  dateRequested: Date;
}

export interface CredentialsStateInterface {
  credentials: Credential[];
  isLoading: boolean;
}

export const initialState = {
  credentials: mockData,
  isLoading: true,
};

const reducer = (state: CredentialsStateInterface = initialState, action: any) => {
  switch (action.type) {
    case CREDENTIAL_ACTION_TYPES.ADD_CREDENTIAL:
      return {
        ...state,
        credentials: [...state.credentials, action.credential],
      };
    case CREDENTIAL_ACTION_TYPES.REQUEST_CREDENTIALS:
      return {
        ...state,
        isLoading: true,
      };
    case CREDENTIAL_ACTION_TYPES.RECEIVE_CREDENTIALS:
      return {
        ...state,
        isLoading: false,
        credentials: action.credentials,
      };
    default:
      return state;
  }
};

export default reducer;
