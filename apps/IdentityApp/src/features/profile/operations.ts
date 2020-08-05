import { Dispatch } from 'redux';
import { toggleEdit, updateProfile, receiveProfile, resetProfile } from './actions';
import { ProfileInterface } from './reducer';
import { StorageProvider, STORAGE_KEYS } from '../../Providers';
import { receiveIsSignedUp, receiveLoggedIn } from '../../state/localUi/actions';
import { receiveMnemonic } from '../identity/actions';
import { resetCredentials } from '../credentialsView/actions';
import * as RootNavigation from '../../AppNavigation';

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
    .catch(error => console.log('STORAGE_KEYS.PROFILE', error));
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

/**
 * Development feature to reset entire Application.
 */
export const signOutAndReset = () => async (dispatch: Dispatch) => {
  console.log('here :)');
  await StorageProvider.removeAll();
  dispatch(receiveIsSignedUp(false));
  dispatch(receiveLoggedIn(false));
  dispatch(receiveMnemonic(false));
  dispatch(resetProfile());
  dispatch(resetCredentials());
  RootNavigation.navigate('SignupFlow', { screen: 'Welcome' });
};
