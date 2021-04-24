import { Language, Website } from '../../entities';
import { IJobsRepository, IJobsCrawler } from '../gateways';

export interface IJobsController {
  crawl(): Promise<void>;
  getWebsitesBetween(from: Date, to: Date): Promise<{ updated_at: string; websites: Website[]; }[]>;
}

export class JobsController implements IJobsController {
  constructor(
    private jobsCrawlers: IJobsCrawler[],
    private jobsRepository: IJobsRepository,
  ) {}

  public async crawl(): Promise<void> {
    const websites: Website[] = await Promise.all(this.jobsCrawlers.map(async jobCrawler => {
      const languages = Object.values(Language).filter(language => jobCrawler.isSupport(language));
      const website = await jobCrawler.crawlWebsite(languages);
      return website;
    }));

    await this.jobsRepository.saveWebsites(websites);
  }

  public async getWebsitesBetween(from: Date, to: Date): Promise<{ updated_at: string; websites: Website[]; }[]> {
    return await this.jobsRepository.getWebsitesBetween(from, to);
  }
}
