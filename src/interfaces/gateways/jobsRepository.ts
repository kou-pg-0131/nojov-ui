import { Job } from '../../domain';
import { IJobsRepository } from '../../usecases';
import { IAPIClient } from '.';

export class JobsRepository implements IJobsRepository {
  constructor(
    private apiClient: IAPIClient,
  ) {}

  public async getAt(year: number, month?: number, date?: number): Promise<Job[]> {
    return await this.apiClient.getAt(year, month, date);
  }
}
