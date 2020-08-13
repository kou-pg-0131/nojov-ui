import { Job } from '../domain';
import { IAPIClient } from '../interfaces/gateways';
import { IHttpClient, IURIBuilder } from '.';

export class NojovAPIClient implements IAPIClient {
  constructor(
    private apiOrigin: string,
    private httpClient: IHttpClient,
    private uriBuilder: IURIBuilder,
  ) {}

  public async getLatest(): Promise<{ latest: Job[] }> {
    const paths = [this.apiOrigin, 'v1', 'jobs', 'latest'];
    const url   = this.uriBuilder.join(...paths);
    return await this.httpClient.get(url);
  }
}
