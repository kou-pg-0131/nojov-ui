import { HTMLParser } from '.';

describe('HTMLParser', () => {
  describe('parse()', () => {
    it('should parse html document', () => {
      const html = '<h1 class="title">document</h1>';
      const htmlParser = new HTMLParser();

      const doc = htmlParser.parse(html);
      expect(doc.querySelector('.title').innerHTML).toEqual('document');
    });
  });
});
