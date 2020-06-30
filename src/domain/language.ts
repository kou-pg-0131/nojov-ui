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

const languageColorsMap = new Map<Language, string>([
  ['java',        '#73A1FB'],
  ['c',           '#194674'],
  ['c++',         '#1A598E'],
  ['c#',          '#7B3399'],
  ['php',         '#777BB3'],
  ['ruby',        '#D34231'],
  ['perl',        '#4E5C84'],
  ['objective-c', '#000000'],
  ['r',           '#2166B7'],
  ['javascript',  '#F0DB4F'],
  ['scala',       '#EA0000'],
  ['go',          '#74CDDD'],
  ['swift',       '#F67D3A'],
  ['cobol',       '#005CA5'],
  ['python',      '#386EA0'],
  ['kotlin',      '#EA8708'],
  ['rust',        '#000000'],
  ['haskell',     '#999999'],
  ['typescript',  '#007ACC'],
]);

export const languageToString = (language: Language): string => {
  return languageStringsMap.get(language) || language;
};

export const languageToColor = (language: Language): string => {
  return languageColorsMap.get(language) || '#3366CB';
}
