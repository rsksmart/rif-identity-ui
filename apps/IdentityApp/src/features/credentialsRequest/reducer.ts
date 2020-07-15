import { CredentialTypes } from '../credentialsView/reducer';

export interface CredentialsStateInterface {
  isRequesting: boolean;
  allTypes: string[];
  requestingType: CredentialTypes | null;
}

export const initialState = {
  isRequesting: false,
  allTypes: Object.keys(CredentialTypes),
  requestingType: null,
};

const reducer = (state: CredentialsStateInterface = initialState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default reducer;
