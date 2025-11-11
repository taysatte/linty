import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { getPuzzleById, getUserSubmission } from "@/lib/puzzle";
import { isSupportedLanguage } from "@/lib/languageVersions";
import { runTestCases } from "@/lib/codeExecution";
import { MAX_ATTEMPTS } from "@/components/puzzle/constants";

/**
 * POST /api/submit
 * Handles puzzle submission: validates code against test cases and records submission
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code, language, puzzleId, timeTaken } = body;

    // Validate input
    if (!code || !language || !puzzleId || timeTaken === undefined) {
      return NextResponse.json(
        { error: "Code, language, puzzleId, and timeTaken are required" },
        { status: 400 }
      );
    }

    // Validate language
    if (!isSupportedLanguage(language)) {
      return NextResponse.json(
        { error: `Unsupported language: ${language}` },
        { status: 400 }
      );
    }

    // TODO: Get userId from authentication session
    // For now, using null as placeholder - will be updated when auth is implemented
    const userId: string | null = null;

    // Get puzzle with all test cases (public + hidden)
    const puzzle = await getPuzzleById(puzzleId);

    if (!puzzle) {
      return NextResponse.json({ error: "Puzzle not found" }, { status: 404 });
    }

    // Check if user has attempts left
    if (userId) {
      const existingSubmission = await getUserSubmission(userId, puzzleId);
      if (existingSubmission) {
        const attemptsLeft = MAX_ATTEMPTS - existingSubmission.attempts;
        if (attemptsLeft <= 0) {
          return NextResponse.json(
            { error: "No attempts remaining" },
            { status: 400 }
          );
        }
      }
    }

    // Validate that puzzle has test cases
    if (!puzzle.testCases || puzzle.testCases.length === 0) {
      return NextResponse.json(
        { error: "Puzzle has no test cases" },
        { status: 500 }
      );
    }

    // Execute code against all test cases
    const testResults = await runTestCases(code, language, puzzle.testCases);

    // Check if all tests passed
    const allTestsPassed = testResults.every((result) => result.passed);

    // Only create/update submission if user is authenticated
    // Only increment attempts when tests fail
    let attemptsLeft: number | null = null;
    if (userId) {
      const existingSubmission = await getUserSubmission(userId, puzzleId);

      if (!allTestsPassed) {
        // Only increment attempts when tests fail
        if (existingSubmission) {
          // Update existing submission (increment attempts)
          const newAttempts = existingSubmission.attempts + 1;
          await prisma.submission.update({
            where: {
              userId_puzzleId: {
                userId,
                puzzleId,
              },
            },
            data: {
              attempts: newAttempts,
              timeTaken: timeTaken, // Update with latest time
            },
          });
          attemptsLeft = Math.max(0, MAX_ATTEMPTS - newAttempts);
        } else {
          // Create new submission
          await prisma.submission.create({
            data: {
              userId,
              puzzleId,
              attempts: 1,
              timeTaken: timeTaken,
            },
          });
          attemptsLeft = Math.max(0, MAX_ATTEMPTS - 1);
        }
      } else {
        // Tests passed - get current attempts without incrementing
        if (existingSubmission) {
          attemptsLeft = Math.max(
            0,
            MAX_ATTEMPTS - existingSubmission.attempts
          );
        } else {
          attemptsLeft = MAX_ATTEMPTS;
        }
      }
    }

    // Return results
    return NextResponse.json({
      success: allTestsPassed,
      allTestsPassed,
      testResults,
      attemptsLeft,
    });
  } catch (error) {
    console.error("Submission error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Submission failed",
      },
      { status: 500 }
    );
  }
}
