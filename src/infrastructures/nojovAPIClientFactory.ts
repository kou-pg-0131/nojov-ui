import { NojovAPIClient, INojovAPIClient } from '.';

export class NojovAPIClientFactory {
  public create(): INojovAPIClient {
    return new NojovAPIClient(process.env.REACT_APP_API_ORIGIN);
  }
}
