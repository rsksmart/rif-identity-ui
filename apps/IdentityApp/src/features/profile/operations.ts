import { Dispatch } from 'redux';
import { toggleEdit, updateProfile, receiveProfile } from './actions';
import { ProfileInterface } from './reducer';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';

export const initialStart = () => async (dispatch: Dispatch) => {
  console.log('initialStart');
  await StorageProvider.get(STORAGE_KEYS.PROFILE)
    .then(response => {
      if (typeof response === 'string') {
        const profile = JSON.parse(response);
        console.log('got it!', profile);
        dispatch(updateProfile(profile));
      }
      dispatch(receiveProfile());
    })
    .catch(error => console.log(error));
};

export const saveProfile = (profile: ProfileInterface) => async (
  dispatch: Dispatch,
) => {
  console.log('saving profile', profile);
  await StorageProvider.set(STORAGE_KEYS.PROFILE, JSON.stringify(profile))
    .then(() => {
      console.log('profile saved');
      dispatch(updateProfile(profile));
      dispatch(toggleEdit(false));
    })
    .catch(error => console.log(error));
};
