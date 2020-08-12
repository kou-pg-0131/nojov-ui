import { Job } from '../domain';
import { IJobsRepository } from '.';

export interface IJobsUsecase {
  getAt(year: number, month?: number, date?: number): Promise<Job[]>;
  getLatest(): Promise<{ latest: Job[] }>;
}

export class JobsUsecase implements IJobsUsecase {
  constructor(
    private repository: IJobsRepository,
  ) {}

  public async getAt(year: number, month?: number, date?: number): Promise<Job[]> {
    return await this.repository.getAt(year, month, date);
  }

  public async getLatest(): Promise<{ latest: Job[] }> {
    return await this.repository.getLatest();
  }
}
