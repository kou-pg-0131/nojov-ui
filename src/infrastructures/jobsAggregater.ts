import { Job, Language, Website } from '../domain';

export class JobsAggregater {
  public static getWebsites(jobs: Job[]): Website[] {
    return jobs.map(job =>
      job.website
    ).filter((website, i, self) =>
      self.findIndex((w) => website.name === w.name) === i
    );
  }

  public static filterByWebsite(jobs: Job[], website?: Website): Job[] {
    return jobs.filter(job => job.website.name === website.name);
  }

  public static sum(jobs: Job[]): { language: Language; count: number; }[] {
    const m = new Map<Language, number>([]);

    jobs.forEach(job => {
      m.set(job.language, (m.get(job.language) || 0) + job.count);
    });

    return Array.from(m.entries()).map(([language, count]) => ({ language, count }));
  }
}
