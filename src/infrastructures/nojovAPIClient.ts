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
    return new Promise(resolve => {
      this.httpClient.get<LatestJobs>(
        this.uriBuilder.join(this.apiOrigin, 'v1/jobs/latest'),
      ).then(res => {
        setTimeout(() => {
          resolve(res);
        }, 1000);
      });
    });
  }
}
