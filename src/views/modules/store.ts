import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { JobsModule } from './jobsModule';

const rootReducer = combineReducers({
  jobs: JobsModule.reducer,
});

export const createStore = () => {
  const middleware = getDefaultMiddleware();

  return configureStore({
    middleware,
    reducer: rootReducer,
  });
};
