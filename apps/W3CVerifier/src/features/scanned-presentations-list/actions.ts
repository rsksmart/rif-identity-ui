import { VerifiedPresentation } from '../../api';

export enum SCANNED_PRESENTATIONS_ACTION_TYPES {
  REQUEST_SCANNED_PRESENTATIONS = 'REQUEST_SCANNED_PRESENTATIONS',
  RECEIVE_SCANNED_PRESENTATIONS = 'RECEIVE_SCANNED_PRESENTATIONS',
  RECEIVE_EMPTY_SCANNED_PRESENTATIONS = 'RECEIVE_EMPTY_SCANNED_PRESENTATIONS',
  ADD_SCANNED_PRESENTATION = 'ADD_SCANNED_PRESENTATION',
  CLEAN_SCANNED_PRESENTATIONS = 'CLEAN_SCANNED_PRESENTATIONS',
}

export const requestScannedPresentations = () => ({
  type: SCANNED_PRESENTATIONS_ACTION_TYPES.REQUEST_SCANNED_PRESENTATIONS,
});

export const receiveScannedPresentations = (presentations: VerifiedPresentation[]) => ({
  type: SCANNED_PRESENTATIONS_ACTION_TYPES.RECEIVE_SCANNED_PRESENTATIONS,
  presentations,
});

export const receiveEmptyScannedPresentations = () => ({
  type: SCANNED_PRESENTATIONS_ACTION_TYPES.RECEIVE_EMPTY_SCANNED_PRESENTATIONS,
})

export const addScannedPresentation = (presentation: VerifiedPresentation) => ({
  type: SCANNED_PRESENTATIONS_ACTION_TYPES.ADD_SCANNED_PRESENTATION,
  presentation
})

export const cleanScannedPresentations = () => ({
  type: SCANNED_PRESENTATIONS_ACTION_TYPES.CLEAN_SCANNED_PRESENTATIONS,
})