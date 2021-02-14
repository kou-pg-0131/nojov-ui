import { NojovAPIClient, INojovAPIClient } from '.';

export class NojovAPIClientFactory {
  public create(): INojovAPIClient {
    return new NojovAPIClient('https://dev.api.nojov.kou-pg.com');
  }
}
