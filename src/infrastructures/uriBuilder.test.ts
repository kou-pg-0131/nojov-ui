import { URIBuilder } from '.';

describe('URIBuilder', () => {
  describe('join()', () => {
    it('should join uris', () => {
      const testCases = [
        { paths: ['https://example.com', 'foo', 'bar'], expected: 'https://example.com/foo/bar' },
        { paths: ['https://example.com', '/foo', '/bar'], expected: 'https://example.com/foo/bar' },
      ];

      testCases.forEach(testCase => {
        const uriBuilder = new URIBuilder();
        expect(uriBuilder.join(...testCase.paths)).toEqual(testCase.expected);
      });
    });
  });
});
