import { PROFILE_ACTION_TYPES } from './actions';

export type ProfileState = {
  isLoaded: boolean;
  isEditing: boolean;
  profile: declarativeDetails[];
};

export interface ProfileInterface {
  FULL_NAME: string;
  BIRTHDATE: string | null;
  ID_NUMBER: string;
  CIVIL_STATUS: string;
  PHONE: string;
  EMAIL: string;
}

export const initialState = {
  isLoaded: false,
  isEditing: false,
  profile: [],
};

const reducer = (state: ProfileState = initialState, action: any) => {
  switch (action.type) {
    case PROFILE_ACTION_TYPES.TOGGLE_EDIT:
      return {
        ...state,
        isEditing: action.isEditing,
      };
    case PROFILE_ACTION_TYPES.EDIT_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    case PROFILE_ACTION_TYPES.RECEIVE_PROFILE:
      return {
        ...state,
        isLoaded: true,
      };
    case PROFILE_ACTION_TYPES.RESET:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
