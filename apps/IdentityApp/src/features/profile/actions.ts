import { ProfileInterface } from './reducer';

export enum PROFILE_ACTION_TYPES {
  EDIT_PROFILE = 'EDIT_PROFILE',
  REQUEST_PROFILE = 'REQUEST_PROFILE',
  RECEIVE_PROFILE = 'RECEIVE_PROFILE',
  RESET = 'RESET',
}

export const updateProfile = (profile: ProfileInterface) => ({
  type: PROFILE_ACTION_TYPES.EDIT_PROFILE,
  profile,
});

export const requestProfile = () => ({
  type: PROFILE_ACTION_TYPES.REQUEST_PROFILE,
});

export const receiveProfile = () => ({
  type: PROFILE_ACTION_TYPES.RECEIVE_PROFILE,
});

export const resetProfile = () => ({
  type: PROFILE_ACTION_TYPES.RESET,
});
