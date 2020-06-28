import { Website } from './website';
import { Language } from './language';

export type Job = {
  date: Date;
  language: Language;
  website: Website;
  count: number;
};
