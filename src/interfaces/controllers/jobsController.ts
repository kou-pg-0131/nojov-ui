import { Job } from '../../domain';
import { IJobsUsecase } from '../../usecases';

export interface IJobsController {
  getAt(year: number, month?: number, date?: number): Promise<Job[]>;
  getLatest(): Promise<{ latest: Job[] }>;
}

export class JobsController implements IJobsController {
  constructor(
    private usecase: IJobsUsecase,
  ) {}

  public async getAt(year: number, month?: number, date?: number): Promise<Job[]> {
    return await this.usecase.getAt(year, month, date);
  }

  public async getLatest(): Promise<{ latest: Job[] }> {
    return await this.usecase.getLatest();
  }
}
