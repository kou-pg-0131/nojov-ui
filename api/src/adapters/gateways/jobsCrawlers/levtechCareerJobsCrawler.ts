import { Language, Job, Website, ScrapeFailedError, FetchDocumentFailedError } from '../../../entities';
import { IJobsCrawler, ICrawler, IUrlBuilder } from '..';
import { sleep } from '../../../utils';

const languageCodeMap = new Map<Language, string>([
  [Language.CPP,        '1'],
  [Language.Java,       '3'],
  [Language.JavaScript, '38'],
  [Language.PHP,        '5'],
  [Language.C,          '6'],
  [Language.Python,     '7'],
  [Language.Ruby,       '8'],
  [Language.Go,         '10'],
  [Language.CSharp,     '11'],
  [Language.Perl,       '12'],
  [Language.ObjectiveC, '16'],
  [Language.Scala,      '17'],
  [Language.COBOL,      '22'],
  [Language.Haskell,    '25'],
  [Language.R,          '28'],
  [Language.Swift,      '50'],
  [Language.Kotlin,     '57'],
  // [Language.Rust,        ''],
  [Language.TypeScript,  '121'],
]);

export class LevtechCareerJobsCrawler implements IJobsCrawler {
  private website = { name: 'レバテックキャリア', url: 'https://career.levtech.jp/' };

  constructor(
    private crawler: ICrawler,
    private urlBuilder: IUrlBuilder,
  ) {}

  public async crawlWebsite(languages: Language[]): Promise<Website> {
    const website: Website = {
      name: this.website.name,
      url: this.website.url,
      search_urls: languages.map(language => ({ language, url: this.buildUrl(language) })),
      jobs: [],
    };

    for (const language of languages) {
      const job = await this.crawlLanguage(language);
      website.jobs.push(job);
      await sleep(5000);
    }

    return website;
  }

  private async crawlLanguage(language: Language): Promise<Job> {
    const url = this.buildUrl(language);
    const count = await this.crawler.fetchDocument(url).then(resp => {
      if (resp.status === 404) return 0;
      if (resp.status !== 200) throw new FetchDocumentFailedError(url, resp.status);

      return this.scrape(resp.document, language);
    });

    return {
      language,
      count,
      search_url: url,
    };
  }

  public isSupport(language: Language): boolean {
    return languageCodeMap.has(language);
  }

  private scrape(doc: Document, language: Language): number {
    switch (language) {
      case Language.TypeScript:
        return this.scrapeFromWordPage(doc);
      default:
        return this.scrapeFromSearchPage(doc);
    }
  }

  private scrapeFromSearchPage(doc: Document): number {
    const selector = '.projectMainResults__list__count em';
    const elm = doc.querySelector(selector);
    if (!elm) throw new ScrapeFailedError(selector);

    const matches = elm.innerHTML.match(/&nbsp;(\d+)&nbsp;/);
    if (!matches || matches.length < 2) throw new ScrapeFailedError(selector);

    return Number(matches[1]);
  }

  private scrapeFromWordPage(doc: Document): number {
    const selector = '.l-column__main__list .numberTxt span';
    const elm = doc.querySelector(selector);
    if (!elm) throw new ScrapeFailedError(selector);

    const matches = elm.innerHTML.match(/(\d+)/);
    if (!matches || matches.length < 2) throw new ScrapeFailedError(selector);

    return Number(matches[1]);
  }

  private buildUrl(language: Language): string {
    switch (language) {
      case Language.TypeScript:
        return this.urlBuilder.build(
          this.urlBuilder.join(this.website.url, 'word/list', languageCodeMap.get(language)),
        );
      default:
        return this.urlBuilder.build(
          this.urlBuilder.join(this.website.url, 'engineer/offer/search/'),
          { 'lang[]': languageCodeMap.get(language) },
        );
    }
  }
}
