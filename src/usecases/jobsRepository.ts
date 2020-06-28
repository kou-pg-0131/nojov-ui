import { Job } from '../domain/job';

export interface IJobsRepository {
  getAt(year: number, month?: number, date?: number): Promise<Job[]>;
}
