import { Dispatch } from 'react';
import { changeLanguage } from 'redux-multilanguage';
import * as RootNavigation from '../AppNavigation';
import { StorageProvider, STORAGE_KEYS } from '../Providers/index';
import { 
  requestVerifiedPresentations, receiveVerifiedPresentations,
  receiveEmptyVerifiedPresentations
} from '../screens/verified-presentations/actions';

export const initialAppStart = () => async (dispatch: Dispatch) => {
  dispatch(requestVerifiedPresentations());

  await StorageProvider.get(STORAGE_KEYS.VERIFIED_CREDENTIALS)
    .then(presentations => {
      dispatch(receiveVerifiedPresentations(presentations!));
      RootNavigation.navigate('MainFlow', { screen: 'VerifiedPresentations' });
    })
    .catch(() => {
      dispatch(receiveEmptyVerifiedPresentations());
      RootNavigation.navigate('MainFlow', { screen: 'VerifiedPresentations' });
    })

  await StorageProvider.get('LANGUAGE')
    .then(res => dispatch(changeLanguage(res)))
    .catch(() => dispatch(changeLanguage('en')));
};
