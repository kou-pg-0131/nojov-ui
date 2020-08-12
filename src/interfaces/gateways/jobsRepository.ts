import { Job } from '../../domain';
import { IJobsRepository } from '../../usecases';
import { IAPIClient } from '.';

export class JobsRepository implements IJobsRepository {
  constructor(
    private apiClient: IAPIClient,
  ) {}

  public async getLatest(): Promise<{ latest: Job[] }> {
    return await this.apiClient.getLatest();
  }
}
