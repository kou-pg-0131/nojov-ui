import { Job } from '../../domain';
import { IJobsUsecase } from '../../usecases';

export interface IJobsController {
  getLatest(): Promise<{ latest: Job[] }>;
}

export class JobsController implements IJobsController {
  constructor(
    private usecase: IJobsUsecase,
  ) {}

  public async getLatest(): Promise<{ latest: Job[] }> {
    return await this.usecase.getLatest();
  }
}
