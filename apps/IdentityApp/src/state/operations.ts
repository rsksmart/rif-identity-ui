import { Dispatch } from 'react';
import { changeLanguage } from 'redux-multilanguage';
import { StorageProvider, STORAGE_KEYS } from '../Providers/index';
import { requestIsSignedUp, receiveIsSignedUp } from './localUi/actions';

export const initialAppStart = () => async (dispatch: Dispatch) => {
  dispatch(requestIsSignedUp());
  await StorageProvider.get(STORAGE_KEYS.PIN)
    .then(res => {
      console.log('PIN response', res);
      dispatch(receiveIsSignedUp(true));
    })
    .catch(() => {
      console.log('PIN not set!');
      dispatch(receiveIsSignedUp(false));
    });

  await StorageProvider.get('LANGUAGE')
    .then(res => dispatch(changeLanguage(res)))
    .catch(() => dispatch(changeLanguage('en')));
};
