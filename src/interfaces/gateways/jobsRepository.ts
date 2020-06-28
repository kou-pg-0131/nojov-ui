import { Job } from '../../domain/job';
import { IJobsRepository } from '../../usecases/jobsRepository';
import { IAPIClient } from './apiClient';

export class JobsRepository implements IJobsRepository {
  constructor(
    private apiClient: IAPIClient,
  ) {}

  public async getAt(year: number, month?: number, date?: number): Promise<Job[]> {
    return await this.apiClient.getAt(year, month, date);
  }
}
