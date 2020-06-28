import { Job } from '../../domain/job';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type State = {
  jobs: Job[];
};

const initialState: State = {
  jobs: [],
};

export const JobsModule = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state: State, action: PayloadAction<Job[]>) => {
      state.jobs = action.payload;
    },
  },
});

export const { actions: jobsActions } = JobsModule;
