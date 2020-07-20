import { PROFILE_ACTION_TYPES } from './actions';

export type ProfileState = {
  isLoaded: boolean;
  isEditing: boolean;
  profile: ProfileInterface;
};

export interface ProfileInterface {
  fullName: string;
  birthdate: string | null;
  idNumber: string;
  civilStatus: string;
  phone: string;
  email: string;
}

export const initialState = {
  isLoaded: false,
  isEditing: false,
  profile: {
    fullName: '',
    birthdate: null,
    idNumber: '',
    civilStatus: '',
    phone: '',
    email: '',
  },
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
