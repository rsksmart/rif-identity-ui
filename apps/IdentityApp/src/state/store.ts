import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import userReducer from './usersSample/reducer';
import localUiReducer from './localUi/reducer';
import signupReducer from '../screens/signup/reducer';

const middleware = [createLogger()];

const rootReducer = combineReducers({
  localUi: localUiReducer,
  signup: signupReducer,
  users: userReducer,
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
