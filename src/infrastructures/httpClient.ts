import axios from 'axios';

export interface IHttpClient {
  get(uri: string): Promise<any>;
}

export class HttpClient implements IHttpClient {
  public async get(uri: string): Promise<any> {
    const res = await axios.get(uri);
    return res.data;
  }
}
