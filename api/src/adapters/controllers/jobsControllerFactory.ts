import {
  IJobsCrawler,
  IJobsRepository,
  JobsRepository,
  CodealJobsCrawler,
  LevtechFreelanceJobsCrawler,
  LevtechCareerJobsCrawler,
  ITPropartnersJobsCrawler,
  ForkwellJobsCrawler,
} from '../gateways';
import { IJobsController, JobsController } from '.';
import { Crawler, URLBuilder, FileStorageOnS3 } from '../../infrastructure';

export class JobsControllerFactory {
  public create(): IJobsController {
    return new JobsController(
      this.createJobsCrawlers(),
      this.createRepository(),
    );
  }

  private createJobsCrawlers(): IJobsCrawler[] {
    const crawler = new Crawler();
    const urlBuilder = new URLBuilder();

    return [
      new CodealJobsCrawler(crawler, urlBuilder),
      new LevtechFreelanceJobsCrawler(crawler, urlBuilder),
      new LevtechCareerJobsCrawler(crawler, urlBuilder),
      new ITPropartnersJobsCrawler(crawler, urlBuilder),
      new ForkwellJobsCrawler(crawler, urlBuilder),
    ];
  }

  private createRepository(): IJobsRepository {
    return new JobsRepository(
      new FileStorageOnS3(process.env.S3_BUCKET_FILES),
    );
  }
}
