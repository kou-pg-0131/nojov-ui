import * as qs from 'querystring';
import { IURLBuilder } from '../adapters/gateways';
import * as urlJoin from 'url-join';

export class URLBuilder implements IURLBuilder {
  public build(url: string, params?: unknown): string {
    const query = qs.stringify(params);
    return `${url}${query === '' ? '' : `?${query}`}`;
  }

  public join(...paths: string[]): string {
    return urlJoin(...paths);
  }
}
