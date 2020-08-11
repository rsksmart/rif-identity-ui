import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from './middleware/customLogger';
import multiLanguageReducer from './multiLanguageReducer';
import presentationListReducer from '../features/scanned-presentations-list/reducer'
import scannedPresentationReducer from '../features/scanned-presentation/reducer'
import localUiReducer from './localUi/reducer'

const middleware = [thunk, logger];

const rootReducer = combineReducers({
  multilanguage: multiLanguageReducer,
  localUi: localUiReducer,
  presentationList: presentationListReducer,
  scannedPresentation: scannedPresentationReducer
});

export type RootState = ReturnType<typeof rootReducer>;

const configureStore = (prelodedState?: any) => {
  const store = createStore(
    rootReducer,
    prelodedState,
    applyMiddleware(...middleware),
  );
  return store;
};

export default configureStore;
