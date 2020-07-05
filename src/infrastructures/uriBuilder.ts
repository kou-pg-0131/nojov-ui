import urlJoin from 'url-join';

export interface IURIBuilder {
  join(...paths: string[]): string;
}

export class URIBuilder implements IURIBuilder {
  public join(...paths: string[]): string {
    return urlJoin(...paths);
  }
}
