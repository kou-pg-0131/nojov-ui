import { LatestJobs } from '../domain';
import { IJobsRepository } from '.';

export interface IJobsUsecase {
  getLatest(): Promise<LatestJobs>;
}

export class JobsUsecase implements IJobsUsecase {
  constructor(
    private repository: IJobsRepository,
  ) {}

  public async getLatest(): Promise<LatestJobs> {
    return await this.repository.getLatest();
  }
}
