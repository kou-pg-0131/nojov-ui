export interface IURLBuilder {
  build(url: string, params?: unknown): string;
  join(...paths: string[]): string;
}
