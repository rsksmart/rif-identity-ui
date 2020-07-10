import { PROFILE_ACTION_TYPES } from './actions';

export type ProfileState = {
  isLoaded: boolean;
  isEditing: boolean;
  profile: ProfileInterface;
};

export interface ProfileInterface {
  fullName: string;
  birthdate: string;
}

export const initialState = {
  isLoaded: false,
  isEditing: false,
  profile: {
    fullName: '',
    birthdate: 'today',
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
    default:
      return state;
  }
};

export default reducer;
