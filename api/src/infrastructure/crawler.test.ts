import { Crawler, IHttpClient, IHTMLParser } from '.';

describe('Crawler', () => {
  describe('fetchDocument', () => {
    it('should return document', async () => {
      const httpClientMock: IHttpClient = { get: jest.fn().mockResolvedValueOnce({ body: Buffer.from('HTML'), status: 200 }) };
      const doc = new Document();
      const htmlParserMock: IHTMLParser = { parse: jest.fn().mockReturnValueOnce(doc) };
      const crawler = new Crawler(httpClientMock, htmlParserMock);

      const resp = await crawler.fetchDocument('https://example.com');
      expect(resp).toEqual({ document: doc, status: 200 });
      expect(httpClientMock.get).toHaveBeenCalledTimes(1);
      expect(httpClientMock.get).toHaveBeenCalledWith(
        'https://example.com',
        { "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.53 Safari/537.36" },
      );
      expect(htmlParserMock.parse).toHaveBeenCalledTimes(1);
      expect(htmlParserMock.parse).toHaveBeenCalledWith('HTML');
    });
  });
});
