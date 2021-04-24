import { JSDOM } from 'jsdom';

export interface IHTMLParser {
  parse(html: string): Document;
}

export class HTMLParser implements IHTMLParser {
  public parse(html: string): Document {
    return new JSDOM(html).window.document;
  }
}
