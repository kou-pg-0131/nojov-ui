export type Language =
  'java' |
  'c' |
  'c++' |
  'c#' |
  'php' |
  'ruby' |
  'perl' |
  'objective-c' |
  'r' |
  'javascript' |
  'scala' |
  'go' |
  'swift' |
  'cobol' |
  'python' |
  'kotlin' |
  'rust' |
  'haskell' |
  'typescript';

const languageStringsMap = new Map<Language, string>([
  ['java', 'Java'],
  ['c', 'C'],
  ['c++', 'C++'],
  ['c#', 'C#'],
  ['php', 'PHP'],
  ['ruby', 'Ruby'],
  ['perl', 'Perl'],
  ['objective-c', 'Objective-C'],
  ['r', 'R言語'],
  ['javascript', 'JavaScript'],
  ['scala', 'Scala'],
  ['go', 'Go'],
  ['swift', 'Swift'],
  ['cobol', 'COBOL'],
  ['python', 'Python'],
  ['kotlin', 'Kotlin'],
  ['rust', 'Rust'],
  ['haskell', 'Haskell'],
  ['typescript', 'TypeScript'],
]);

export const languagesToString = (language: Language): string => {
  return languageStringsMap.get(language)!;
};
