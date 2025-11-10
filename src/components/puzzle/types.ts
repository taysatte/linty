import { type Language } from "@/lib/languageVersions";

/**
 * Props for executing code
 */
export interface RunCodeProps {
  code: string;
  language: Language; // Changed from string to Language for type safety
}

/**
 * Props for submitting a puzzle
 */
export interface SubmitPuzzleProps {
  code: string;
  language: Language;
  puzzleId: number;
  timeTaken: number; // Time taken in seconds
}
