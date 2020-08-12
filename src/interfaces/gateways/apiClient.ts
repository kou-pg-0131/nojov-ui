import { Job } from '../../domain';

export interface IAPIClient {
  getAt(year: number, month?: number, date?: number): Promise<Job[]>;
  getLatest(): Promise<{ latest: Job[] }>;
}
