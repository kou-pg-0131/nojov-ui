import { Job, Language } from '.';

export type Website = {
  name: string;
  url: string;
  search_urls: SearchUrl[];
  jobs: Job[];
};

export type SearchUrl = {
  language: Language;
  url: string;
};
