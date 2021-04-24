import { Language, Website } from '../../domain';

export interface IJobsCrawler {
  crawlWebsite(languages: Language[]): Promise<Website>;
  isSupport(language: Language): boolean;
}
