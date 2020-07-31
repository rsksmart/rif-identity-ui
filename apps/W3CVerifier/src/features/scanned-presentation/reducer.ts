import { VerifiedPresentation } from '../../api';
import { SCANNED_PRESENTATION_ACTION_TYPES } from './actions';
import { SCANNED_PRESENTATIONS_ACTION_TYPES } from '../scanned-presentations-list/actions';

interface ScannedPresentationStateInterface {
  validJwt?: boolean
  presentation?: VerifiedPresentation
  isVerifying: boolean
  viewDetails: boolean
  allowScanAgain: boolean
}

const initialState: ScannedPresentationStateInterface = {
  isVerifying: false,
  viewDetails: false,
  allowScanAgain: true,
}

const reducer = (state: ScannedPresentationStateInterface = initialState, action: any) => {
  if (action.type === SCANNED_PRESENTATION_ACTION_TYPES.RECEIVE_VALID_JWT) {
    console.log(action)
  }
  switch (action.type) {
    case SCANNED_PRESENTATION_ACTION_TYPES.REQUEST_VERIFY_JWT: 
      return {
        ...state,
        isVerifying: true,
        presentation: undefined,
        viewDetails: false,
        allowScanAgain: false,
      }
    case SCANNED_PRESENTATION_ACTION_TYPES.RECEIVE_INVALID_JWT: 
      return {
        ...state,
        isVerifying: false,
        validJwt: false,
        presentation: action.presentation,
        viewDetails: false,
        allowScanAgain: true,
      }
    case SCANNED_PRESENTATION_ACTION_TYPES.RECEIVE_VALID_JWT: 
      return {
        ...state,
        isVerifying: false,
        validJwt: true,
        presentation: action.presentation,
        viewDetails: false,
        allowScanAgain: true,
      }
    case SCANNED_PRESENTATION_ACTION_TYPES.VIEW_DETAILS: 
      return {
        ...state,
        viewDetails: true,
      }
    case SCANNED_PRESENTATION_ACTION_TYPES.SHOW_PRESENTATION: 
      return {
        ...state,
        presentation: action.presentation,
        viewDetails: false,
      }
    default:
      return state;
  }
};

export default reducer;