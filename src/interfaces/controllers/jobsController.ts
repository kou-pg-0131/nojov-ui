import { LatestJobs } from '../../domain';
import { IJobsUsecase } from '../../usecases';

export interface IJobsController {
  getLatest(): Promise<LatestJobs>;
}

export class JobsController implements IJobsController {
  constructor(
    private usecase: IJobsUsecase,
  ) {}

  public async getLatest(): Promise<LatestJobs> {
    return await this.usecase.getLatest();
  }
}
