export type Language =
  'Java' |
  'C言語' |
  'C++' |
  'C#' |
  'PHP' |
  'Ruby' |
  'Perl' |
  'Objective-C' |
  'R言語' |
  'JavaScript' |
  'Scala' |
  'Go' |
  'Swift' |
  'COBOL' |
  'Python' |
  'Kotlin' |
  'Rust' |
  'Haskell' |
  'TypeScript';

const languageColorsMap = new Map<Language, string>([
  ['Java',        '#73A1FB'],
  ['C言語',       '#194674'],
  ['C++',         '#1A598E'],
  ['C#',          '#7B3399'],
  ['PHP',         '#777BB3'],
  ['Ruby',        '#D34231'],
  ['Perl',        '#4E5C84'],
  ['Objective-C', '#000000'],
  ['R言語',       '#2166B7'],
  ['JavaScript',  '#F0DB4F'],
  ['Scala',       '#EA0000'],
  ['Go',          '#74CDDD'],
  ['Swift',       '#F67D3A'],
  ['COBOL',       '#005CA5'],
  ['Python',      '#386EA0'],
  ['Kotlin',      '#EA8708'],
  ['Rust',        '#000000'],
  ['Haskell',     '#999999'],
  ['TypeScript',  '#007ACC'],
]);

export const languageToColor = (language: Language): string => {
  return languageColorsMap.get(language) || '#3366CB';
};
