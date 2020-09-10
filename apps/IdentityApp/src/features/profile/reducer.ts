import { PROFILE_ACTION_TYPES } from './actions';

export type ProfileState = {
  profile: ProfileInterface;
};

export interface ProfileInterface {
  FULL_NAME: string;
  BIRTHDATE: string | null;
  ID_NUMBER: string;
  CIVIL_STATUS: string;
  PHONE: string;
  EMAIL: string;
  ADDRESS: string;
  CITY: string;
  DRIVERS_LICENSE_NUMBER: string;
}

export const initialState = {
  profile: [],
};

const reducer = (state: ProfileState = initialState, action: any) => {
  switch (action.type) {
    case PROFILE_ACTION_TYPES.EDIT_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case PROFILE_ACTION_TYPES.RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
