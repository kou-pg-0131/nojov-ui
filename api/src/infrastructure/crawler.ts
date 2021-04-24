import { ICrawler } from '../interfaces/gateways';
import { HttpClient, IHttpClient, HTMLParser, IHTMLParser } from '.';
import { Logger } from '../utils';

export class Crawler implements ICrawler {
  private logger = new Logger('Crawler');
  private userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.53 Safari/537.36';

  constructor(
    private httpClient: IHttpClient = new HttpClient(),
    private htmlParser: IHTMLParser = new HTMLParser(),
  ) {}

  public async fetchDocument(url: string): Promise<{ document: Document, status: number }> {
    this.logger.info('fetching document....', `url: ${url}`);

    const resp = await this.httpClient.get(url, { 'User-Agent': this.userAgent });
    const html = resp.body.toString();
    this.logger.info('fetched.', `url: ${url}`, `status: ${resp.status}`);

    return { document: this.htmlParser.parse(html), status: resp.status };
  }
}
