import { VerifiedPresentation } from '../../api';
import { SCANNED_PRESENTATIONS_ACTION_TYPES } from './actions';

interface ScannedPresentationsStateInterface {
  isLoading: boolean
  presentations: VerifiedPresentation[]
}

const initialState: ScannedPresentationsStateInterface = {
  isLoading: false,
  presentations: [],
}

const reducer = (state: ScannedPresentationsStateInterface = initialState, action: any) => {
  switch (action.type) {
    case SCANNED_PRESENTATIONS_ACTION_TYPES.REQUEST_SCANNED_PRESENTATIONS: 
      return {
        ...state,
        isLoading: true,
        presentations: [], // TODO: Remove, not necessary when loading works
      }
    case SCANNED_PRESENTATIONS_ACTION_TYPES.RECEIVE_SCANNED_PRESENTATIONS: 
      return {
        ...state,
        isLoading: false,
        presentations: action.presentations
      }
    case SCANNED_PRESENTATIONS_ACTION_TYPES.ADD_SCANNED_PRESENTATION: 
      return {
        ...state,
        presentations: [...state.presentations,  action.presentation],
      }
    case SCANNED_PRESENTATIONS_ACTION_TYPES.RECEIVE_EMPTY_SCANNED_PRESENTATIONS: 
      return {
        ...state,
        isLoading: false,
        presentations: [],
      }
    case SCANNED_PRESENTATIONS_ACTION_TYPES.CLEAN_SCANNED_PRESENTATIONS: 
      return {
        ...state,
        isLoading: false,
        presentations: [],
      }
    default:
      return state;
  }
};

export default reducer;