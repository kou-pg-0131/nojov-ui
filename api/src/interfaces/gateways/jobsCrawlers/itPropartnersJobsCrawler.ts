import { Job, Website, Language, ScrapeFailedError, FetchDocumentFailedError } from '../../../entities';
import { IJobsCrawler, ICrawler, IURLBuilder } from '..';
import { sleep } from '../../../utils';

const languageCodesMap = new Map<Language, string>([
  [Language.PHP,        '1'],
  [Language.Java,       '2'],
  [Language.Python,     '3'],
  [Language.Ruby,       '4'],
  [Language.Perl,       '5'],
  [Language.ObjectiveC, '6'],
  [Language.Go,         '7'],
  [Language.Swift,      '8'],
  [Language.Kotlin,     '10'],
  [Language.JavaScript, '11'],
  [Language.C,          '12'],
  [Language.CPP,        '12'],
  [Language.CSharp,     '13'],
  [Language.COBOL,      '14'],
  [Language.Scala,      '84'],
  // [Language.R,           ''],
  // [Language.Rust,        ''],
  // [Language.Haskell,     ''],
  // [Language.TypeScript,  ''],
]);

export class ITPropartnersJobsCrawler implements IJobsCrawler {
  private website = { name: 'ITプロパートナーズ', url: 'https://itpropartners.com' };

  constructor(
    private crawler: ICrawler,
    private urlBuilder: IURLBuilder,
  ) {}

  public async crawlWebsite(languages: Language[]): Promise<Website> {
    const website = { name: this.website.name, url: this.website.url, jobs: [] };

    for (const language of languages) {
      const job = await this.crawlLanguage(language);
      website.jobs.push(job);
      await sleep(5000);
    }

    return website;
  }

  private async crawlLanguage(language: Language): Promise<Job> {
    const url = this.buildURL(language);
    const count = await this.crawler.fetchDocument(url).then(resp => {
      if (resp.status !== 200) throw new FetchDocumentFailedError(url, resp.status);
      return this.scrape(resp.document);
    });

    return {
      language,
      count,
      search_url: url,
    };
  }

  public isSupport(language: Language): boolean {
    return languageCodesMap.has(language);
  }

  private scrape(doc: Document): number {
    const selector = '.recruite__list--header .count b';
    const elm = doc.querySelector(selector);
    if (!elm) throw new ScrapeFailedError(selector);

    const matches = elm.innerHTML.match(/ (\d+)/);
    if (!matches || matches.length < 2) throw new ScrapeFailedError(selector);

    return Number(matches[1]);
  }

  private buildURL(language: Language): string {
    return this.urlBuilder.build(
      this.urlBuilder.join(this.website.url, 'job/search'),
      { 'skills[]': languageCodesMap.get(language) },
    );
  }
}
