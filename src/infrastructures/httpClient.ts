import axios from 'axios';

export interface IHttpClient {
  get<T>(uri: string): Promise<T>;
}

export class HttpClient implements IHttpClient {
  public async get<T>(uri: string): Promise<T> {
    return (await axios.get<T>(uri)).data;
  }
}
