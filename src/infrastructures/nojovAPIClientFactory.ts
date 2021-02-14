import { NojovAPIClient, INojovAPIClient } from '.';

export class NojovAPIClientFactory {
  public create(): INojovAPIClient {
    return new NojovAPIClient(process.env.NEXT_PUBLIC_API_ORIGIN);
  }
}
