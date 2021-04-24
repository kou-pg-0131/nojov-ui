import { Job, Language, Website, ScrapeFailedError, FetchDocumentFailedError } from '../../../entities';
import { IJobsCrawler, ICrawler, IUrlBuilder } from '..';
import { sleep } from '../../../utils';

const languageTagsMap = new Map<Language, string>([
  [Language.Java,       'java'],
  [Language.C,          'c'],
  [Language.CPP,        'c++'],
  [Language.CSharp,     'c%23'],
  [Language.PHP,        'php'],
  [Language.Ruby,       'ruby'],
  [Language.Perl,       'perl'],
  [Language.ObjectiveC, 'objective-c'],
  [Language.R,          'r'],
  [Language.JavaScript, 'javascript'],
  [Language.Scala,      'scala'],
  [Language.Go,         'go'],
  [Language.Swift,      'swift'],
  [Language.COBOL,      'cobol'],
  [Language.Python,     'python'],
  [Language.Kotlin,     'kotlin'],
  [Language.Rust,       'rust'],
  [Language.Haskell,    'haskell'],
  [Language.TypeScript, 'typescript'],
]);

export class ForkwellJobsCrawler implements IJobsCrawler {
  private website = { name: 'forkwell jobs', url: 'https://jobs.forkwell.com/' };

  constructor(
    private crawler: ICrawler,
    private urlBuilder: IUrlBuilder,
  ) {}

  public async crawlWebsite(languages: Language[]): Promise<Website> {
    const website: Website = {
      ...this.website,
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
    const count: number = await this.crawler.fetchDocument(url).then(resp => {
      if (resp.status === 404) return 0;
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
    return languageTagsMap.has(language);
  }

  private scrape(doc: Document): number {
    const selector = '.container .clearfix .float-left span';
    const elm = doc.querySelector(selector);
    if (!elm) throw new ScrapeFailedError(selector);

    const matches = elm.innerHTML.match(/(\d+)/);
    if (!matches || matches.length < 2) throw new Error(`[${this.website.name}] scrape count failed`);

    return Number(matches[1]);
  }

  private buildUrl(language: Language): string {
    return this.urlBuilder.join(this.website.url, 't', languageTagsMap.get(language));
  }
}
