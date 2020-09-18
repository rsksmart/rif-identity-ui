import { CREDENTIAL_ACTION_TYPES } from './actions';
import { serverInterface } from '../../../src/Providers/Issuers';

export enum CredentialTypes {
  DRIVERS_LICENSE = 'DRIVERS_LICENSE',
  PASSPORT = 'PASSPORT',
  ID = 'ID',
}

export enum CredentialStatus {
  CERTIFIED = 'CERTIFIED',
  PENDING = 'PENDING',
  DENIED = 'DENIED',
}

export interface Credential {
  issuer: serverInterface;
  hash: string;
  status: CredentialStatus;
  dateRequested?: Date;
  VerifiedCredential?: VerifiedCredential;
  type: CredentialTypes;
  jwt?: string;
  payload?: any;
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
  credentials: Credential[] | null;
  isLoading: boolean;
  isRequestingCredential: boolean;
  isCheckingPendingStatus: boolean;
  requestCredentialError: string | null;
  presentation: string | null;
  presentationUri: string | null;
}

export const initialState = {
  credentials: null,
  isLoading: true,
  isRequestingCredential: false,
  isCheckingPendingStatus: false,
  requestCredentialError: null,
  presentation: null,
  presentationUri: null
};

const reducer = (state: CredentialsStateInterface = initialState, action: any) => {
  switch (action.type) {
    case CREDENTIAL_ACTION_TYPES.REQUEST_CREDENTIAL:
      return {
        ...state,
        isRequestingCredential: true,
        requestCredentialError: null,
      };
    case CREDENTIAL_ACTION_TYPES.RECEIVE_CREDENTAIL:
      return {
        ...state,
        credentials: [...state.credentials, action.credential],
        isRequestingCredential: false,
      };
    case CREDENTIAL_ACTION_TYPES.ERROR_REQUEST_CREDENTIAL:
      return {
        ...state,
        isRequestingCredential: false,
        requestCredentialError: action.message,
      };

    case CREDENTIAL_ACTION_TYPES.REQUEST_ALL_CREDENTIALS:
      return {
        ...state,
        isLoading: true,
      };
    case CREDENTIAL_ACTION_TYPES.RECEIVE_ALL_CREDENTIALS:
      return {
        ...state,
        isLoading: false,
        credentials: action.credentials,
      };

    case CREDENTIAL_ACTION_TYPES.REQUEST_ALL_PENDING_STATUS:
      return {
        ...state,
        isCheckingPendingStatus: true,
      };
    case CREDENTIAL_ACTION_TYPES.RECEIVE_ALL_PENDING_STATUS:
      return {
        ...state,
        isCheckingPendingStatus: false,
        credentials: action.credentials,
      };

    case CREDENTIAL_ACTION_TYPES.REQUEST_PRESENTATION:
      return {
        ...state,
        presentation: null,
        presentationUri: null,
      };
    case CREDENTIAL_ACTION_TYPES.RECEIVE_PRESENTATION:
      return {
        ...state,
        presentationUri: action.presentationUri,
      };

    case CREDENTIAL_ACTION_TYPES.RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
