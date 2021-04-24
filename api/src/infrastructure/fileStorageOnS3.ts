import * as aws from 'aws-sdk';
import { Logger } from '../utils';
import { IFileStorage } from '../adapters/gateways/fileStorage';
import { FileNotFoundError } from '../entities';

export class FileStorageOnS3 implements IFileStorage {
  private logger = new Logger('FileStorageOnS3');
  private s3Client = new aws.S3();

  constructor(
    private bucket: string,
  ) {}

  public async get(path: string): Promise<Buffer> {
    this.logger.info('getting object...', `key: s3://${this.bucket}/${path}`);

    return await new Promise((resolve, reject) => {
      this.s3Client.getObject({ Bucket: this.bucket, Key: path }, (err, data) => {
        if (err) {
          if (err.code === 'NoSuchKey') {
            reject(new FileNotFoundError(path));
            return;
          }
          reject(err);
          return;
        }

        this.logger.info('got object.', `key: s3://${this.bucket}/${path}`);
        resolve(data.Body as Buffer);
      });
    });
  }

  public async save(path: string, data: Buffer, contentType: string): Promise<void> {
    this.logger.info('putting object...', `key: s3://${this.bucket}/${path}`);

    await this.s3Client.putObject({ Bucket: this.bucket, Key: path, Body: data, ContentType: contentType }).promise();
    this.logger.info('put.', `key: s3://${this.bucket}/${path}`);
  }

  public async list(prefix: string): Promise<Buffer[]> {
    const bufs: Buffer[] = [];

    const resp = await this.s3Client.listObjectsV2({
      Bucket: this.bucket,
      Prefix: prefix,
    }).promise();

    await Promise.all(resp.Contents.map(async content => {
      const buf = await this.get(content.Key);
      bufs.push(buf);
    }));

    return bufs;
  }
}
