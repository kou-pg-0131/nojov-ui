import { LatestJobs } from '../../domain';

export interface IAPIClient {
  getLatest(): Promise<LatestJobs>;
}
