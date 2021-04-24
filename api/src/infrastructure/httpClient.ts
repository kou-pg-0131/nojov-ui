import axios from 'axios';
import { Logger } from '../utils';

export interface IHttpClient {
  get(url: string, headers?: HttpHeaders): Promise<HttpResponse>;
}

export type HttpResponse = {
  body: Buffer;
  status: number;
};

export type HttpHeaders = {
  'User-Agent'?: string;
};

export class HttpClient implements IHttpClient {
  private logger = new Logger('HttpClient');

  constructor(
    private httpGet = axios.get,
  ) {}

  public async get(url: string, headers?: HttpHeaders): Promise<HttpResponse>{
    this.logger.info('send get request.', `url: ${url}`, `headers: ${JSON.stringify(headers)}`);

    const resp = await this.httpGet<Buffer>(url, { headers, responseType: 'arraybuffer', validateStatus: () => true });
    this.logger.info('received get response.', `url: ${url}`, `status: ${resp.status}`);

    return { body: resp.data, status: resp.status };
  }
}
