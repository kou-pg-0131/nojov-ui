import { LatestJobs } from '../domain';

export interface IJobsRepository {
  getLatest(): Promise<LatestJobs>;
}
