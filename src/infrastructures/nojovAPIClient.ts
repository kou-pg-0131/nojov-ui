import { LatestJobs } from '../domain';
import { IHttpClient, HttpClient, IURIBuilder, URIBuilder } from '.';

export interface INojovAPIClient {
  getLatest(): Promise<LatestJobs>;
}

export class NojovAPIClient implements INojovAPIClient {
  constructor(
    private apiOrigin: string,
    private httpClient: IHttpClient = new HttpClient(),
    private uriBuilder: IURIBuilder = new URIBuilder(),
  ) {}

  public async getLatest(): Promise<LatestJobs> {
    const paths = [this.apiOrigin, 'v1', 'jobs', 'latest'];
    const url = this.uriBuilder.join(...paths);
    return await this.httpClient.get(url);
  }
}
