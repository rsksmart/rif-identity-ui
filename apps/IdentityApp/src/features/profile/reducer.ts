import { PROFILE_ACTION_TYPES } from './actions';

export type ProfileState = {
  isLoading: boolean;
  isLoaded: boolean;
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
  isLoading: false,
  isLoaded: false,
  profile: [],
};

const reducer = (state: ProfileState = initialState, action: any) => {
  switch (action.type) {
    case PROFILE_ACTION_TYPES.EDIT_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case PROFILE_ACTION_TYPES.REQUEST_PROFILE:
      return {
        ...state,
        isLoading: true,
      };
    case PROFILE_ACTION_TYPES.RECEIVE_PROFILE:
      return {
        ...state,
        isLoading: false,
        isLoaded: true,
      };
    case PROFILE_ACTION_TYPES.RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
