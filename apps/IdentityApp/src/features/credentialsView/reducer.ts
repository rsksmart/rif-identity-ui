import mockData from './mockData.json';

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
}

export interface CredentialsStateInterface {
  credentials: Credential[];
}

export const initialState = {
  credentials: mockData,
};

const reducer = (state: CredentialsStateInterface = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
