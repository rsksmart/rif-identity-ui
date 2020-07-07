import {LOCALUI_ACTION_TYPES} from './actions';

type LocalUiState = {
  isSignedUp: boolean;
};

export const initialState = {
  isSignedUp: false,
};

const reducer = (state: LocalUiState = initialState, action: any) => {
  console.log('LocalUiReducer', action);
  switch (action.type) {
    case LOCALUI_ACTION_TYPES.REQUEST_IS_SIGNED_IN:
      return state;
    case LOCALUI_ACTION_TYPES.RECEIVE_IS_SIGNED_IN:
      return {
        ...state,
        isSignedUp: action.isSignedUp,
      };
    default:
      return state;
  }
};

export default reducer;
