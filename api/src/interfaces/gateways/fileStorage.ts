export interface IFileStorage {
  save(path: string, data: Buffer, contentType: string): Promise<void>;
  get(path: string): Promise<Buffer>;
  list(prefix: string): Promise<Buffer[]>;
}
