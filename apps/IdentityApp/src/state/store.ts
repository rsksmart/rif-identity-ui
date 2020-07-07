import {createStore, combineReducers, applyMiddleware} from 'redux';
import {createLogger} from 'redux-logger';
import userReducer from './usersSample/reducer';
import localUiReducer from './localUi/reducer';

const middleware = [createLogger()];

const rootReducer = combineReducers({
  localUi: localUiReducer,
  users: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const configureStore = (prelodedState: any) => {
  const store = createStore(
    rootReducer,
    prelodedState,
    applyMiddleware(...middleware),
  );
  return store;
};

export default configureStore;
