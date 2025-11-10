import { getTodayPuzzle, getAttemptsLeft } from "@/lib/puzzle";
import { notFound } from "next/navigation";
import PuzzlePageClient from "@/components/puzzle/PuzzlePageClient";
import { MAX_ATTEMPTS } from "@/components/puzzle/constants";

// Force dynamic rendering - puzzle changes daily
export const dynamic = "force-dynamic";
export const revalidate = 0; // Disable caching for daily puzzle

const PuzzlePage = async () => {
  const dailyPuzzle = await getTodayPuzzle();

  if (!dailyPuzzle) {
    notFound();
  }

  // TODO: Get userId from authentication session
  // For now, using null as placeholder - will be updated when auth is implemented
  const userId: string | null = null;

  const attemptsLeft = await getAttemptsLeft(
    userId,
    dailyPuzzle.puzzle.id,
    MAX_ATTEMPTS
  );

  const puzzleData = {
    id: dailyPuzzle.puzzle.id,
    tags: dailyPuzzle.puzzle.tags,
    dailyPuzzleId: dailyPuzzle.id,
    date: dailyPuzzle.date.toISOString(),
    title: dailyPuzzle.puzzle.title,
    description: dailyPuzzle.puzzle.description?.description || "",
    instructions: dailyPuzzle.puzzle.description?.instructions || null,
    starterCode: dailyPuzzle.puzzle.starterCode,
    difficulty: dailyPuzzle.puzzle.difficulty,
    language: dailyPuzzle.puzzle.language,
    hints: dailyPuzzle.puzzle.hints,
    testCases: dailyPuzzle.puzzle.testCases,
    attemptsLeft, // Number of attempts remaining for the user
  };

  return <PuzzlePageClient puzzle={puzzleData} />;
};

export default PuzzlePage;
