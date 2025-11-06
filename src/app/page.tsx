import { getTodayPuzzle } from "@/lib/puzzle";
import { notFound } from "next/navigation";
import PuzzlePageClient from "@/components/puzzle/PuzzlePageClient";

// Force dynamic rendering - puzzle changes daily
export const dynamic = "force-dynamic";
export const revalidate = 0; // Disable caching for daily puzzle

const PuzzlePage = async () => {
  const dailyPuzzle = await getTodayPuzzle();

  if (!dailyPuzzle) {
    notFound();
  }

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
  };

  return <PuzzlePageClient puzzle={puzzleData} />;
};

export default PuzzlePage;
