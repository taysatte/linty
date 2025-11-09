/**
 * Language version mappings for Piston API execution
 */
export const languageVersions = {
  javascript: "18.15.0",
  // typescript: "5.0.3",
  // python: "3.10.0",
  // java: "15.0.2",
  // csharp: "6.12.0",
  // php: "8.2.3",
} as const;

/**
 * Display names for languages
 */
export const languageDisplayNames = {
  javascript: "JavaScript",
  // typescript: "TypeScript",
  // python: "Python",
  // java: "Java",
  // csharp: "C#",
  // php: "PHP",
} as const;

export type Language = keyof typeof languageVersions;

/**
 * Get the version for a given language
 * @param language - The language key
 * @returns The version string or undefined if language doesn't exist
 */
export function getLanguageVersion(language: string): string | undefined {
  return languageVersions[language as Language];
}

/**
 * Check if a language is supported
 * @param language - The language key to check
 * @returns True if the language is supported
 */
export function isSupportedLanguage(language: string): language is Language {
  return language in languageVersions;
}
