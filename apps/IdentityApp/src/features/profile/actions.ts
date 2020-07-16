import { ProfileInterface } from "./reducer";

export enum PROFILE_ACTION_TYPES {
  TOGGLE_EDIT = 'TOGGLE_EDIT',
  EDIT_PROFILE = 'EDIT_PROFILE',
  RECEIVE_PROFILE = 'RECEIVE_PROFILE',
}

export const toggleEdit = (isEditing: boolean) => ({
  type: PROFILE_ACTION_TYPES.TOGGLE_EDIT,
  isEditing,
});

export const updateProfile = (profile: ProfileInterface) => ({
  type: PROFILE_ACTION_TYPES.EDIT_PROFILE,
  profile,
});

export const receiveProfile = () => ({
  type: PROFILE_ACTION_TYPES.RECEIVE_PROFILE,
});
