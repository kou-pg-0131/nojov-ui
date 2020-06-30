import { Job } from '../../domain/job';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type State = {
  fetched: boolean;
  jobs: Job[];
};

const initialState: State = {
  fetched: false,
  jobs: [],
};

export const JobsModule = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state: State, action: PayloadAction<Job[]>) => {
      state.fetched = true;
      state.jobs = action.payload;
    },
  },
});

export const { actions: jobsActions } = JobsModule;
