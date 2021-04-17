import { Website } from '../domain';
import { IHttpClient, HttpClient } from '.';

export class NojovAPIClient {
  constructor(
    private httpClient: IHttpClient = new HttpClient(),
  ) {}

  public async getWebsites(): Promise<{ updated_at: Date; websites: Website[] }[]> {
    const resp = await this.httpClient.get<{ websites: Website[]; updated_at: string; }[]>('https://api.nojov.kou-pg.com/v1/websites');
    return resp.map(item => ({
      updated_at: new Date(item.updated_at),
      websites: item.websites,
    }));
  }
}
