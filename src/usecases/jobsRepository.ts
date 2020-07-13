import { Job } from '../domain';

export interface IJobsRepository {
  getAt(year: number, month?: number, date?: number): Promise<Job[]>;
}
