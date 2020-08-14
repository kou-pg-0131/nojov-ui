import { Job } from '.';

export type LatestJobs = {
  updated_at: Date;
  today: Job[];
};
