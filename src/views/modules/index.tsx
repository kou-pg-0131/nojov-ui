import { State as JobsState } from './jobsModule';

export type RootState = {
  jobs: JobsState;
};

export * from './jobsModule';
export * from './store';
