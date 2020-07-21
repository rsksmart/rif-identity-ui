import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from './middleware/customLogger';
import multiLanguageReducer from './multiLanguageReducer';

const middleware = [thunk, logger];

const rootReducer = combineReducers({
  multilanguage: multiLanguageReducer,
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
