import { subYears, addDays } from 'date-fns';
import { format } from 'date-fns';
import * as qs from 'query-string';
import { Website } from '../domain';
import { IHttpClient, HttpClient } from '.';

export class NojovAPIClient {
  constructor(
    private apiOrigin: string = process.env.NEXT_PUBLIC_API_ORIGIN,
    private httpClient: IHttpClient = new HttpClient(),
  ) {}

  public async getLatestWebsites(): Promise<{ updated_at: Date; websites: Website[] }> {
    const resp = await this.httpClient.get<{ websites: Website[]; updated_at: string; }>('https://api.nojov.kou-pg.com/v1/websites/latest');
    return {
      updated_at: new Date(resp.updated_at),
      websites: resp.websites,
    };
  }

  public async getWebsites(from: Date): Promise<{ updated_at: Date; websites: Website[] }[]> {
    const query = qs.stringify({ from: format(from, 'yyyy-MM-dd') });
    const resp = await this.httpClient.get<{ websites: Website[]; updated_at: string; }[]>(`https://api.nojov.kou-pg.com/v1/websites?${query}`);
    return resp.map(item => ({
      updated_at: new Date(item.updated_at),
      websites: item.websites,
    }));
  }
}
