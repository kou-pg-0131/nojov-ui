import { UrlBuilder } from '.';

describe('UrlBuilder', () => {
  describe('build()', () => {
    it('should return url', () => {
      const testCases = [
        { url: 'https://example.com', params: undefined,                    expected: 'https://example.com' },
        { url: 'https://example.com', params: {},                           expected: 'https://example.com' },
        { url: 'https://example.com', params: { foo: 'bar' },               expected: 'https://example.com?foo=bar' },
        { url: 'https://example.com', params: { hoge: 'piyo', foo: 'bar' }, expected: 'https://example.com?hoge=piyo&foo=bar' },
        { url: 'https://example.com', params: { 'hoge[]': 'hoge' },         expected: 'https://example.com?hoge%5B%5D=hoge' },
      ];

      testCases.forEach(testCase => {
        const urlBuilder = new UrlBuilder();
        const url = urlBuilder.build(testCase.url, testCase.params);

        expect(url).toEqual(testCase.expected);
      });
    });
  });

  describe('join()', () => {
    it('shoud join urls', () => {
      const testCases = [
        { paths: ['https://example.com', 'foo', 'bar'], expected: 'https://example.com/foo/bar' },
        { paths: ['https://example.com', '/foo', '/bar'], expected: 'https://example.com/foo/bar' },
        { paths: ['https://example.com', '/foo/', '/bar'], expected: 'https://example.com/foo/bar' },
        { paths: ['https://example.com', '/foo/', '/bar/'], expected: 'https://example.com/foo/bar/' },
      ];

      testCases.forEach(testCase => {
        const urlBuilder = new UrlBuilder();
        const url = urlBuilder.join(...testCase.paths);

        expect(url).toEqual(testCase.expected);
      });
    });
  });
});
