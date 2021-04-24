import * as qs from 'querystring';
import { IUrlBuilder } from '../adapters/gateways';
import * as urlJoin from 'url-join';

export class UrlBuilder implements IUrlBuilder {
  public build(url: string, params?: unknown): string {
    const query = qs.stringify(params);
    return `${url}${query === '' ? '' : `?${query}`}`;
  }

  public join(...paths: string[]): string {
    return urlJoin(...paths);
  }
}
