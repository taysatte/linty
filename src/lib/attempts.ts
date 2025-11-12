import { MAX_ATTEMPTS } from "@/components/puzzle/constants";

const STORAGE_KEY_PREFIX = "linty_attempts_";

/**
 * Get the storage key for a specific puzzle
 */
function getStorageKey(puzzleId: number): string {
  return `${STORAGE_KEY_PREFIX}${puzzleId}`;
}

/**
 * Get attempts for an anonymous user from localStorage
 * @param puzzleId - The puzzle ID
 * @returns Number of attempts used (0 if none)
 */
export function getAnonymousAttempts(puzzleId: number): number {
  if (typeof window === "undefined") return 0;

  try {
    const stored = localStorage.getItem(getStorageKey(puzzleId));
    return stored ? parseInt(stored, 10) : 0;
  } catch {
    return 0;
  }
}

/**
 * Increment attempts for an anonymous user in localStorage
 * Only increments when tests fail
 * @param puzzleId - The puzzle ID
 * @param testsPassed - Whether all tests passed
 * @returns New number of attempts used
 */
export function incrementAnonymousAttempts(
  puzzleId: number,
  testsPassed: boolean
): number {
  if (typeof window === "undefined") return 0;

  // Only increment if tests failed
  if (testsPassed) {
    return getAnonymousAttempts(puzzleId);
  }

  try {
    const current = getAnonymousAttempts(puzzleId);
    const newAttempts = current + 1;
    localStorage.setItem(getStorageKey(puzzleId), newAttempts.toString());
    return newAttempts;
  } catch {
    return 0;
  }
}

/**
 * Get attempts left for an anonymous user
 * @param puzzleId - The puzzle ID
 * @returns Number of attempts remaining
 */
export function getAnonymousAttemptsLeft(puzzleId: number): number {
  const attemptsUsed = getAnonymousAttempts(puzzleId);
  return Math.max(0, MAX_ATTEMPTS - attemptsUsed);
}

/**
 * Clear attempts for a puzzle (useful for testing or reset)
 * @param puzzleId - The puzzle ID
 */
export function clearAnonymousAttempts(puzzleId: number): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.removeItem(getStorageKey(puzzleId));
  } catch {
    // Ignore errors
  }
}
