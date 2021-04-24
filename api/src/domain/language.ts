export const Language = {
  Java: 'Java',
  C: 'C言語',
  CPP: 'C++',
  CSharp: 'C#',
  PHP: 'PHP',
  Ruby: 'Ruby',
  Perl: 'Perl',
  ObjectiveC: 'Objective-C',
  R: 'R言語',
  JavaScript: 'JavaScript',
  Scala: 'Scala',
  Go: 'Go',
  Swift: 'Swift',
  COBOL: 'COBOL',
  Python: 'Python',
  Kotlin: 'Kotlin',
  Rust: 'Rust',
  Haskell: 'Haskell',
  TypeScript: 'TypeScript',
} as const;

export type Language = typeof Language[keyof typeof Language];
