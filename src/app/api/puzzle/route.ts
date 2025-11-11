import { NextRequest, NextResponse } from "next/server";
import { getTodayPuzzle, getAttemptsLeft } from "@/lib/puzzle";
import { MAX_ATTEMPTS } from "@/components/puzzle/constants";
import { getUserId } from "@/lib/supabase/server";

/**
 * GET /api/puzzle
 * Returns today's active puzzle with public test cases and user's attempts left
 */
export async function GET(request: NextRequest) {
  try {
    const dailyPuzzle = await getTodayPuzzle();

    if (!dailyPuzzle) {
      return NextResponse.json(
        { error: "No puzzle scheduled for today" },
        { status: 404 }
      );
    }

    // Get userId from authentication session
    const userId = await getUserId();

    const attemptsLeft = await getAttemptsLeft(
      userId,
      dailyPuzzle.puzzle.id,
      MAX_ATTEMPTS
    );

    // Return puzzle data (excluding hidden test cases)
    return NextResponse.json({
      id: dailyPuzzle.puzzle.id,
      dailyPuzzleId: dailyPuzzle.id,
      date: dailyPuzzle.date,
      title: dailyPuzzle.puzzle.title,
      description: dailyPuzzle.puzzle.description?.description || "",
      instructions: dailyPuzzle.puzzle.description?.instructions || null,
      starterCode: dailyPuzzle.puzzle.starterCode,
      difficulty: dailyPuzzle.puzzle.difficulty,
      language: dailyPuzzle.puzzle.language,
      hints: dailyPuzzle.puzzle.hints,
      testCases: dailyPuzzle.puzzle.testCases, // Only public test cases
      attemptsLeft, // Number of attempts remaining for the user
    });
  } catch (error) {
    console.error("Error fetching puzzle:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to fetch puzzle",
      },
      { status: 500 }
    );
  }
}
