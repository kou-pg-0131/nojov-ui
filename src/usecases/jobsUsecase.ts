import { Job } from '../domain';
import { IJobsRepository } from '.';

export interface IJobsUsecase {
  getAt(year: number, month?: number, date?: number): Promise<Job[]>;
}

export class JobsUsecase implements IJobsUsecase {
  constructor(
    private repository: IJobsRepository,
  ) {}

  public async getAt(year: number, month?: number, date?: number): Promise<Job[]> {
    return await this.repository.getAt(year, month, date);
  }
}
