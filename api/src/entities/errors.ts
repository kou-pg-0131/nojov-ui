import { CustomError } from 'ts-custom-error';

export class FetchDocumentFailedError extends CustomError {
  constructor(url: string, status: number) {
    super(`Fetch document failed.\nurl: ${url}, status: ${status}`);
  }
}

export class ScrapeFailedError extends CustomError {
  constructor(cssSelector: string) {
    super(`Scrape failed.\ncssSelector: ${cssSelector}`);
  }
}

export class FileNotFoundError extends CustomError {
  constructor(filename: string) {
    super(`File not found.: ${filename}`);
  }
}
