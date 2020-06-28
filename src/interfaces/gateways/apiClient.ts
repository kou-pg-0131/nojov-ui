import { Job } from '../../domain/job';

export interface IAPIClient {
  getAt(year: number, month?: number, date?: number): Promise<Job[]>;
}
