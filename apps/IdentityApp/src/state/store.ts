import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createMultilanguageReducer } from 'redux-multilanguage';
import thunk from 'redux-thunk';
import initialLanguageState from '@rsksmart/languages';
import customLogger from './middleware/customLogger';

import localUiReducer from './localUi/reducer';
import declarativeDetailsReducer from '@rsksmart/rif-id-core/lib/reducers/declarativeDetails';
import { PinReducer } from '../features/pin';
import identityReducer from '@rsksmart/rif-id-core/lib/reducers/identitySlice';
import RestoreReducer from '../features/restore/reducer';
import { SettingsReducer } from '../features/settings';
import authenticationReducer from '@rsksmart/rif-id-core/lib/reducers/authentication';
import CredentialsReducer from '@rsksmart/rif-id-core/lib/reducers/credentials';
import RequestedCredentials from '@rsksmart/rif-id-core/lib/reducers/issuedCredentialRequests';

const middleware = [thunk, customLogger];

const rootReducer = combineReducers({
  localUi: localUiReducer,
  declarativeDetails: declarativeDetailsReducer,
  issuedCredentials: CredentialsReducer,
  requestedCredentials: RequestedCredentials,
  pin: PinReducer,
  identity: identityReducer,
  restore: RestoreReducer,
  settings: SettingsReducer,
  authentication: authenticationReducer,
  multilanguage: createMultilanguageReducer(initialLanguageState),
});

export type RootState = ReturnType<typeof rootReducer>;

const configureStore = (prelodedState?: any) => {
  const store = createStore(rootReducer, prelodedState, applyMiddleware(...middleware));
  return store;
};

export default configureStore;
