export interface IUrlBuilder {
  build(url: string, params?: unknown): string;
  join(...paths: string[]): string;
}
