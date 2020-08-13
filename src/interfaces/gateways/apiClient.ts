import { Job } from '../../domain';

export interface IAPIClient {
  getLatest(): Promise<{ latest: Job[] }>;
}
