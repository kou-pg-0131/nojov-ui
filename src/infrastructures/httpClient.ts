import axios from 'axios';

export interface IHttpClient {
  get(uri: string, headers?: any): Promise<any>;
}

export class HttpClient implements IHttpClient {
  public async get(uri: string, headers?: any): Promise<any> {
    const res = await axios.get(uri, { data: {}, headers: headers });
    return res.data;
  }
}
