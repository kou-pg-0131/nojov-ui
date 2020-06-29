import { Website } from './website';
import { Language } from './language';

export type Job = {
  date: string;
  language: Language;
  website: Website;
  count: number;
};
