import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createMultilanguageReducer } from 'redux-multilanguage';
import thunk from 'redux-thunk';
import initialLanguageState from '@rsksmart/languages';
import customLogger from './middleware/customLogger';

import localUiReducer from './localUi/reducer';
import profileReducer from '../features/profile/reducer';
import credentialReducer from '../features/credentialsView/reducer';
import { PinReducer } from '../features/pin';
// import { IdentityReducer } from '../features/identity';
import RestoreReducer from '../features/restore/reducer';
import { SettingsReducer } from '../features/settings';
import identityReducer from 'jesse-rif-id-core/lib/reducers/identitySlice';

const middleware = [thunk, customLogger];

const rootReducer = combineReducers({
  localUi: localUiReducer,
  profile: profileReducer,
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
