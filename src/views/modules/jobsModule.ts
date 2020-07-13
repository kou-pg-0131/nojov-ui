import { Job } from '../../domain';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type State = {
  fetched: boolean;
  jobs: Job[];
  fetchedJobsOfThisYear: boolean;
  jobsOfThisYear: Job[];
};

const initialState: State = {
  fetched: false,
  jobs: [],
  fetchedJobsOfThisYear: false,
  jobsOfThisYear: [],
};

export const JobsModule = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state: State, action: PayloadAction<Job[]>) => {
      state.fetched = true;
      state.jobs = action.payload;
    },
    setJobsOfThisYear: (state: State, action: PayloadAction<Job[]>) => {
      state.fetchedJobsOfThisYear = true;
      state.jobsOfThisYear = action.payload;
    },
  },
});

export const { actions: jobsActions } = JobsModule;
