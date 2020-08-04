import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createMultilanguageReducer } from 'redux-multilanguage';
import thunk from 'redux-thunk';
import initialLanguageState from '@rsksmart/languages';
import customLogger from './middleware/customLogger';

import localUiReducer from './localUi/reducer';
import signupReducer from '../screens/signup/reducer';
import profileReducer from '../features/profile/reducer';
import credentialReducer from '../features/credentialsView/reducer';
import { PinReducer } from '../features/pin';

const middleware = [thunk, customLogger];

const rootReducer = combineReducers({
  localUi: localUiReducer,
  signup: signupReducer,
  profile: profileReducer,
  credentials: credentialReducer,
  pin: PinReducer,
  multilanguage: createMultilanguageReducer(initialLanguageState),
});

export type RootState = ReturnType<typeof rootReducer>;

const configureStore = (prelodedState?: any) => {
  const store = createStore(rootReducer, prelodedState, applyMiddleware(...middleware));
  return store;
};

export default configureStore;
