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
}
