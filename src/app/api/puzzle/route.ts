import { NextRequest, NextResponse } from "next/server";
import { getTodayPuzzle } from "@/lib/puzzle";

/**
 * GET /api/puzzle
 * Returns today's active puzzle with public test cases
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
