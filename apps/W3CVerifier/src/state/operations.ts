import { Dispatch } from 'react';
import { changeLanguage } from 'redux-multilanguage';
import * as RootNavigation from '../AppNavigation';
import { StorageProvider, STORAGE_KEYS } from '../Providers/index';
import { 
  requestScannedPresentations, receiveScannedPresentations,
  receiveEmptyScannedPresentations
} from '../screens/scanned-presentations/actions';

export const initialAppStart = () => async (dispatch: Dispatch) => {
  dispatch(requestScannedPresentations());

  await StorageProvider.get(STORAGE_KEYS.SCANNED_CREDENTIALS)
    .then(presentations => {
      dispatch(receiveScannedPresentations(presentations!));
      RootNavigation.navigate('MainFlow', { screen: 'ScannedPresentations' });
    })
    .catch(() => {
      dispatch(receiveEmptyScannedPresentations());
      RootNavigation.navigate('MainFlow', { screen: 'ScannedPresentations' });
    })

  await StorageProvider.get('LANGUAGE')
    .then(res => dispatch(changeLanguage(res)))
    .catch(() => dispatch(changeLanguage('en')));
};
