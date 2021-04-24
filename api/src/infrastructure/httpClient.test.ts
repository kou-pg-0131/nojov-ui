import { HttpClient } from '.';

describe('HttpClient', () => {
  describe('get()', () => {
    it('should return response', async () => {
      const getMock = jest.fn().mockResolvedValueOnce({
        data: Buffer.from('some response'),
        status: 200,
      });
      const httpClient = new HttpClient(getMock);

      const resp = await httpClient.get('https://example.com', { 'User-Agent': 'USER_AGENT' });

      expect(resp).toEqual({ body: Buffer.from('some response'), status: 200 });
      expect(getMock).toHaveBeenCalledTimes(1);
      expect(getMock).toHaveBeenCalledWith(
        'https://example.com',
        {
          headers: { 'User-Agent': 'USER_AGENT' },
          responseType: 'arraybuffer',
          validateStatus: expect.any(Function),
        },
      );
    });
  });
});
