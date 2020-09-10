import { Dispatch } from 'redux';
import { updateProfile } from './actions';
import { ProfileInterface } from './reducer';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';
import DeclarativeDetail from 'jesse-rif-id-core/lib/entities/DeclarativeDetail';

export const getProfileFromLocalStorage = () => async (dispatch: Dispatch) => {
  await StorageProvider.get(STORAGE_KEYS.PROFILE)
    .then(response => {
      if (typeof response === 'string') {
        const profile = JSON.parse(response);
        dispatch(updateProfile(profile));
      }
    })
    .catch(() => dispatch(updateProfile([])));
};

/**
 * Saves Profile to LocalStorage
 * @param profile Profile to be saved
 */
export const saveProfile = (profile: ProfileInterface) => async (dispatch: Dispatch) => {
  console.log(profile);

  // const name = new DeclarativeDetail()
  /*
  Object.keys(profile).map(item => {
    if (profile[item] !== '' && profile[item] !== undefined) {
      new DeclarativeDetail('fullName', 'string', 'Charly Garcia'),
      console.log(item, profile[item]);
    }
  });
  */

  await StorageProvider.set(STORAGE_KEYS.PROFILE, JSON.stringify(profile))
    .then(() => {
      console.log(profile);

      dispatch(updateProfile(profile));
      return true;
    })
    .catch(() => {
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
