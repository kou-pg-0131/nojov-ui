import { IJobsCrawler, ICrawler, IUrlBuilder } from '..';
import { Website, Language, Job, FetchDocumentFailedError, ScrapeFailedError } from '../../../entities';
import { sleep } from '../../../utils';

const languageCodeMap = new Map<Language, string>([
  [Language.CPP,        'C++'],
  [Language.Java,       'Java'],
  [Language.JavaScript, 'JavaScript'],
  [Language.PHP,        'PHP'],
  [Language.C,          'C'],
  [Language.Python,     'Python'],
  [Language.Ruby,       'Ruby'],
  [Language.Go,         'Go'],
  [Language.CSharp,     'C#'],
  [Language.Perl,       'Perl'],
  [Language.ObjectiveC, 'Objective-C'],
  [Language.Scala,      'Scala'],
  [Language.COBOL,      'COBOL'],
  [Language.Haskell,    'Haskell'],
  [Language.R,          'R'],
  [Language.Swift,      'Swift'],
  [Language.Kotlin,     'Kotlin'],
  [Language.Rust,       'Rust'],
  [Language.TypeScript, 'TypeScript'],
]);

export class CodealJobsCrawler implements IJobsCrawler {
  private website = { name: 'CODEAL', url: 'https://www.codeal.work/' };

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

  public isSupport(language: Language): boolean {
    return languageCodeMap.has(language);
  }

  private async crawlLanguage(language: Language): Promise<Job> {
    const url = this.buildUrl(language);
    const count = await this.crawler.fetchDocument(url).then(resp => {
      if (resp.status !== 200) throw new FetchDocumentFailedError(url, resp.status);
      return this.scrape(resp.document);
    });

    return { language, count };
  }

  private scrape(doc: Document): number {
    if (doc.querySelectorAll('.container .not-found').length !== 0) return 0;

    const selector = '.container .page-info span';
    const elm = doc.querySelector(selector);
    if (!elm) throw new ScrapeFailedError(selector);

    const matches = elm.innerHTML.match(/(\d+) 件中/);
    if (!matches || matches.length < 2) throw new ScrapeFailedError(selector);

    return Number(matches[1]);
  }

  private buildUrl(language: Language): string {
    return this.urlBuilder.build(
      this.urlBuilder.join(
        this.website.url,
        'jobs',
      ),
      { skills: languageCodeMap.get(language) },
    );
  }
}
