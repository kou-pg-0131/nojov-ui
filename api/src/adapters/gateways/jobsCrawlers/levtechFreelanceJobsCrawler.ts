import { Language, Website, Job, FetchDocumentFailedError, ScrapeFailedError } from '../../../entities';
import { IJobsCrawler, ICrawler, IUrlBuilder } from '..';
import { sleep } from '../../../utils';

const languageCodeMap = new Map<Language, string>([
  [Language.CPP,        'skill-1'],
  [Language.Java,       'skill-3'],
  [Language.JavaScript, 'skill-4'],
  [Language.PHP,        'skill-5'],
  [Language.C,          'skill-6'],
  [Language.Python,     'skill-7'],
  [Language.Ruby,       'skill-8'],
  [Language.Go,         'skill-10'],
  [Language.CSharp,     'skill-11'],
  [Language.Perl,       'skill-12'],
  [Language.ObjectiveC, 'skill-16'],
  [Language.Scala,      'skill-17'],
  [Language.COBOL,      'skill-22'],
  [Language.Haskell,    'skill-25'],
  [Language.R,          'skill-28'],
  [Language.Swift,      'skill-49'],
  [Language.Kotlin,     'skill-57'],
  // [Language.Rust,        'skill-'],
  [Language.TypeScript,  '93'],
]);

export class LevtechFreelanceJobsCrawler implements IJobsCrawler {
  private website = { name: 'レバテックフリーランス', url: 'https://freelance.levtech.jp/' };

  constructor(
    private crawler: ICrawler,
    private urlBuilder: IUrlBuilder,
  ) {}

  public async crawlWebsite(languages: Language[]): Promise<Website> {
    const website: Website = { name: this.website.name, url: this.website.url, jobs: [] };

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
        return this.scrapeFromProjectPage(doc);
    }
  }

  private scrapeFromProjectPage(doc: Document): number {
    const selector = '.search__result__summary > span';
    const elm = doc.querySelector(selector);
    if (!elm) throw new ScrapeFailedError(selector);

    const matches = elm.innerHTML.match(/(\d+)/);
    if (!matches || matches.length < 2) throw new ScrapeFailedError(selector);

    return Number(matches[1]);
  }

  private scrapeFromWordPage(doc: Document): number {
    const selector = '.resultNumber span';
    const elm = doc.querySelector(selector);
    if (!elm) throw new ScrapeFailedError(selector);

    const matches = elm.innerHTML.match(/(\d+)/);
    if (!matches || matches.length < 2) throw new ScrapeFailedError(selector);

    return Number(matches[1]);
  }

  private buildUrl(language: Language): string {
    switch (language) {
      case Language.TypeScript:
        return this.urlBuilder.join(this.website.url, 'word/list', languageCodeMap.get(language));
      default:
        return this.urlBuilder.join(this.website.url, 'project', languageCodeMap.get(language));
    }
  }
}
