import { VerifiedPresentation } from '../../api'

export enum SCANNED_PRESENTATION_ACTION_TYPES {
  REQUEST_VERIFY_JWT = 'REQUEST_VERIFY_JWT',
  RECEIVE_INVALID_JWT = 'RECEIVE_INVALID_JWT',
  RECEIVE_VALID_JWT = 'RECEIVE_VALID_JWT',
  VIEW_DETAILS = 'VIEW_DETAILS'
}

export const requestVerifyJwt = () => ({
  type: SCANNED_PRESENTATION_ACTION_TYPES.REQUEST_VERIFY_JWT,
  isVerifying: true,
})

export const receiveInvalidJwt = () => ({
  type: SCANNED_PRESENTATION_ACTION_TYPES.RECEIVE_INVALID_JWT,
  isVerifying: false,
  validJwt: false,
})

export const receiveValidJwt = (presentation: VerifiedPresentation) => ({
  type: SCANNED_PRESENTATION_ACTION_TYPES.RECEIVE_VALID_JWT,
  isVerifying: false,
  validJwt: true,
  presentation,
})

export const viewPresentationDetails = () => ({
  type: SCANNED_PRESENTATION_ACTION_TYPES.VIEW_DETAILS,
})