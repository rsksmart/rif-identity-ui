import {LOCALUI_ACTION_TYPES} from './actions';
import sampleMnemonic from './sampleMnemonic';

type LocalUiState = {
  isSignedUp: boolean;
};

export const initialState = {
  isSignedUp: false,
};

const reducer = (state: LocalUiState = initialState, action: any) => {
  console.log('LocalUiReducer', action);
  switch (action.type) {
    
    default:
      return state;
  }
};

export default reducer;
