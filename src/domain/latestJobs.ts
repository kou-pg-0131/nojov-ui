import { Job } from '.';

export type LatestJobs = {
  updated_at: string;
  today: Job[];
};
