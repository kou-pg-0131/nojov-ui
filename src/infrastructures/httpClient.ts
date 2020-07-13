import axios from 'axios';

export interface IHttpClient {
  get(uri: string): Promise<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export class HttpClient implements IHttpClient {
  public async get(uri: string): Promise<any> { // eslint-disable-line @typescript-eslint/no-explicit-any
    const res = await axios.get(uri);
    return res.data;
  }
}
