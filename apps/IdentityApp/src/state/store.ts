import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createMultilanguageReducer } from 'redux-multilanguage';
import thunk from 'redux-thunk';
import initialLanguageState from '@rsksmart/languages';
import customLogger from './middleware/customLogger';

import localUiReducer from './localUi/reducer';
import declarativeDetailsReducer from '@rsksmart/rif-id-core/lib/reducers/declarativeDetails';
import credentialReducer from '../features/credentialsView/reducer';
import { PinReducer } from '../features/pin';
import identityReducer from '@rsksmart/rif-id-core/lib/reducers/identitySlice';
import RestoreReducer from '../features/restore/reducer';
import { SettingsReducer } from '../features/settings';

const middleware = [thunk, customLogger];

const rootReducer = combineReducers({
  localUi: localUiReducer,
  declarativeDetails: declarativeDetailsReducer,
  credentials: credentialReducer,
  pin: PinReducer,
  identity: identityReducer,
  restore: RestoreReducer,
  settings: SettingsReducer,
  multilanguage: createMultilanguageReducer(initialLanguageState),
});

export type RootState = ReturnType<typeof rootReducer>;

const configureStore = (prelodedState?: any) => {
  const store = createStore(rootReducer, prelodedState, applyMiddleware(...middleware));
  return store;
};

export default configureStore;
