import {Dispatch} from 'react';
import {StorageProvider} from '../Providers/index';
import {requestIsSignedUp, receiveIsSignedUp} from './localUi/actions';


export const initialAppStart = () => async (dispatch: Dispatch) => {
  dispatch(requestIsSignedUp());
  await StorageProvider.get('PIN')
    .then((res) => {
      console.log('PIN response', res);
      dispatch(receiveIsSignedUp(true));
    })
    .catch(() => {
      console.log('PIN not set!');
      dispatch(receiveIsSignedUp(false));
    });
};
