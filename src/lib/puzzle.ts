import { prisma } from "@/lib/prisma";

/**
 * Get the current date normalized to start of day (UTC)
 * This ensures consistent puzzle selection across timezones
 */
export function getTodayDate(): Date {
  const now = new Date();
  return new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  );
}

/**
 * Get today's active puzzle
 * @returns The DailyPuzzle with puzzle data for today, or null if none scheduled
 */
export async function getTodayPuzzle() {
  const today = getTodayDate();

  const dailyPuzzle = await prisma.dailyPuzzle.findUnique({
    where: {
      date: today,
    },
    include: {
      puzzle: {
        include: {
          description: true,
          testCases: {
            where: {
              isPublic: true, // Only include public test cases for display
            },
          },
        },
      },
    },
  });

  return dailyPuzzle;
}

/**
 * Get puzzle by ID (for validation/submission)
 * Includes all test cases (public + hidden)
 */
export async function getPuzzleById(id: number) {
  return await prisma.puzzle.findUnique({
    where: { id },
    include: {
      description: true,
      testCases: true, // Include all test cases for validation
    },
  });
}

/**
 * Schedule a puzzle for a specific date
 * @param puzzleId - The puzzle to schedule
 * @param date - The date to schedule it for (defaults to today)
 */
export async function schedulePuzzle(
  puzzleId: number,
  date?: Date
): Promise<void> {
  const targetDate = date || getTodayDate();

  await prisma.dailyPuzzle.upsert({
    where: {
      date: targetDate,
    },
    create: {
      date: targetDate,
      puzzleId,
    },
    update: {
      puzzleId, // Update if already exists for that date
    },
  });
}

/**
 * Schedule a puzzle for today (convenience function)
 */
export async function schedulePuzzleForToday(puzzleId: number): Promise<void> {
  await schedulePuzzle(puzzleId);
}
