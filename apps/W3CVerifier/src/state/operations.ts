import { Dispatch } from 'react';
import { changeLanguage } from 'redux-multilanguage';
import * as RootNavigation from '../AppNavigation';
import { StorageProvider, STORAGE_KEYS } from '../providers/index';
import { 
  requestScannedPresentations, receiveScannedPresentations,
  receiveEmptyScannedPresentations
} from '../features/actions';

export const initialAppStart = () => async (dispatch: Dispatch) => {
  dispatch(requestScannedPresentations());

  await StorageProvider.get(STORAGE_KEYS.SCANNED_CREDENTIALS)
    .then(presentations => {
      dispatch(receiveScannedPresentations(presentations!));
    })
    .catch(() => {
      dispatch(receiveEmptyScannedPresentations());
    })

  RootNavigation.navigate('MainFlow', { screen: 'PresentationNavigation' });

  await StorageProvider.get('LANGUAGE')
    .then(res => dispatch(changeLanguage(res)))
    .catch(() => dispatch(changeLanguage('en')));
};
