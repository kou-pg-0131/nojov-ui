import { Language, Website } from '../../entities';

export interface IJobsCrawler {
  crawlWebsite(languages: Language[]): Promise<Website>;
  isSupport(language: Language): boolean;
}
