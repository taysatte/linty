import { type Language } from "@/lib/languageVersions";
import { type TestResult } from "@/lib/codeExecution";

/**
 * Props for executing code
 */
export interface RunCodeProps {
  code: string;
  language: Language; // Changed from string to Language for type safety
  puzzleId?: number; // Optional puzzle ID to run tests
}

/**
 * Response from execute API
 */
export interface ExecuteCodeResponse {
  output: string[];
  error: string | null;
  exitCode: number;
  testResults?: TestResult[] | null;
  allTestsPassed?: boolean;
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

// Re-export TestResult for convenience
export type { TestResult };

/**
 * Response from submit API
 */
export interface SubmitPuzzleResponse {
  success: boolean;
  allTestsPassed: boolean;
  testResults: TestResult[];
  attemptsLeft: number | null;
}
