export interface ICrawler {
  fetchDocument(url: string): Promise<DocumentResponse>;
}

export type DocumentResponse = {
  status: number;
  document: Document;
};

