import { LatestJobs } from '../domain';
import { IHttpClient, HttpClient, IURIBuilder, URIBuilder } from '.';

export interface INojovAPIClient {
  getLatest(): Promise<LatestJobs>;
}

export class NojovAPIClient implements INojovAPIClient {
  constructor(
    private apiOrigin: string = process.env.NEXT_PUBLIC_API_ORIGIN,
    private httpClient: IHttpClient = new HttpClient(),
    private uriBuilder: IURIBuilder = new URIBuilder(),
  ) {}

  public async getLatest(): Promise<LatestJobs> {
    return await this.httpClient.get(
      this.uriBuilder.join(this.apiOrigin, 'v1/jobs/latest'),
    );
  }
}
