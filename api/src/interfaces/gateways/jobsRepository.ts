import { Website, FileNotFoundError } from '../../entities';
import { IFileStorage } from '.';

export interface IJobsRepository {
  saveWebsites(websites: Website[], date?: Date): Promise<void>;
  getWebsitesBetween(from: Date, to: Date): Promise<{ websites: Website[]; updated_at: string }[]>;
}

export class JobsRepository implements IJobsRepository {
  constructor(
    private fileStorage: IFileStorage,
  ) {}

  public async saveWebsites(websites: Website[], date: Date = new Date()): Promise<void> {
    const buf = Buffer.from(JSON.stringify({
      websites,
      updated_at: date,
    }));

    await this.fileStorage.save(
      `websites/${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}.json`,
      buf,
      'application/json',
    );
  }

  public async getWebsitesBetween(from: Date, to: Date): Promise<{ websites: Website[]; updated_at: string }[]> {
    const items: { websites: Website[]; updated_at: string }[] = [];

    const dates = this.buildPeriod(from, to);

    await Promise.all(dates.map(async date => {
      await this.getWebsites(date).then(item => {
        items.push(item);
      }).catch(err => {
        switch (err.constructor) {
          case FileNotFoundError:
            console.error(err);
            return;
          default:
            throw err;
        }
      });
    }));

    return items;
  }

  private async getWebsites(date: Date): Promise<{ websites: Website[]; updated_at: string }> {
    const buf = await this.fileStorage.get(`websites/${date.getUTCFullYear()}/${date.getUTCMonth() + 1}/${date.getUTCDate()}.json`);
    return JSON.parse(buf.toString());
  }

  private buildPeriod(from: Date, to: Date): Date[] {
    const dates: Date[] = [];

    for (const date = from; date <= to; date.setUTCDate(date.getUTCDate() + 1)) {
      dates.push(new Date(date));
    }

    return dates;
  }
}
