import { Job } from '../domain';
import { IJobsRepository } from '.';

export interface IJobsUsecase {
  getLatest(): Promise<{ latest: Job[] }>;
}

export class JobsUsecase implements IJobsUsecase {
  constructor(
    private repository: IJobsRepository,
  ) {}

  public async getLatest(): Promise<{ latest: Job[] }> {
    return await this.repository.getLatest();
  }
}
