import { FileStorageOnS3 } from '.';
import * as AWS from 'aws-sdk';
import * as AWSMock from 'aws-sdk-mock';
AWSMock.setSDKInstance(AWS);

describe('FileStorageOnS3', () => {
  afterEach(() => AWSMock.restore('S3'));

  describe('get()', () => {
    it('should return data.', async () => {
      // TODO
      // const getMock = jest.fn().mockResolvedValueOnce({ Body: Buffer.from('Hello World') });
      // AWSMock.mock('S3', 'getObject', (params, callback) => callback(null, getMock(params)));
      //
      // const storage = new FileStorageOnS3('BUCKET');
      // const buf = await storage.get('PATH');
      //
      // expect(getMock).toHaveBeenCalledWith({ Bucket: 'BUCKET', Key: 'PATH' });
      // expect(buf).toEqual(Buffer.from('Hello World'));
    });
  });

  describe('save()', () => {
    it('should not throw error.', async () => {
      const saveMock = jest.fn();
      AWSMock.mock('S3', 'putObject', (params, callback) => callback(null, saveMock(params)));
      const storage = new FileStorageOnS3('BUCKET');

      await expect(storage.save('PATH', Buffer.from('Hello World'), 'CONTENT_TYPE')).resolves.not.toThrow();
      expect(saveMock).toHaveBeenCalledWith({ Bucket: 'BUCKET', Key: 'PATH', Body: Buffer.from('Hello World'), ContentType: 'CONTENT_TYPE' });
    });
  });
});
