import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { JobsModule } from '.';

const rootReducer = combineReducers({
  jobs: JobsModule.reducer,
});

export const createStore = (): any => { // eslint-disable-line @typescript-eslint/no-explicit-any
  const middleware = getDefaultMiddleware();

  return configureStore({
    middleware,
    reducer: rootReducer,
  });
};
