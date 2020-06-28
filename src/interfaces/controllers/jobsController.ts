import { Job } from '../../domain/job';
import { IJobsUsecase } from '../../usecases/jobsUsecase';

export interface IJobsController {
  getAt(year: number, month?: number, date?: number): Promise<Job[]>;
}

export class JobsController implements IJobsController {
  constructor(
    private usecase: IJobsUsecase,
  ) {}

  public async getAt(year: number, month?: number, date?: number): Promise<Job[]> {
    return await this.usecase.getAt(year, month, date);
  }
}
