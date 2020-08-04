import { Dispatch } from 'redux';
import { toggleEdit, updateProfile, receiveProfile } from './actions';
import { ProfileInterface } from './reducer';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';

export const initialStart = () => async (dispatch: Dispatch) => {
  dispatch(toggleEdit(false));

  await StorageProvider.get(STORAGE_KEYS.PROFILE)
    .then(response => {
      if (typeof response === 'string') {
        const profile = JSON.parse(response);
        dispatch(updateProfile(profile));
      }
      dispatch(receiveProfile());
    })
    .catch(error => console.log(error));
};

/**
 * Saves Profile to LocalStorage
 * @param profile Profile to be saved
 */
export const saveProfile = (profile: ProfileInterface) => async (dispatch: Dispatch) => {
  await StorageProvider.set(STORAGE_KEYS.PROFILE, JSON.stringify(profile))
    .then(() => {
      dispatch(updateProfile(profile));
      return true;
    })
    .catch(error => {
      console.log(error);
      return false;
    });
};

/**
 * Helper function to determin if Profile is empty
 * @param profile
 */
export const isEmpty = (profile: ProfileInterface) => {
  let empty = true;
  Object.keys(profile).map(item => {
    if (profile[item] !== '' && profile[item] !== null) {
      empty = false;
    }
  });
  return empty;
};
