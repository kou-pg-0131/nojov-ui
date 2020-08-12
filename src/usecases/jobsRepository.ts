import { Job } from '../domain';

export interface IJobsRepository {
  getLatest(): Promise<{ latest: Job[] }>;
}
