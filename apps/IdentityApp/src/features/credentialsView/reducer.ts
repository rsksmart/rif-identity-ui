// import mockData from './mockData.json';
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

export interface Credential {
  hash: number;
  status: CredentialStatus;
  dateRequested: Date;
  VerifiedCredential?: VerifiedCredential;
  type: CredentialTypes;
}

// JWT standards:
export interface VerifiedCredential {
  vc: any;
  type: [];
  credentialSubject: {};
  sub: string;
  iss: string;
}

export interface CredentialsStateInterface {
  credentials: Credential[];
  isLoading: boolean;
}

export const initialState = {
  credentials: [],
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
    case CREDENTIAL_ACTION_TYPES.RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
