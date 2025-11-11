import { NextRequest, NextResponse } from "next/server";
import { isSupportedLanguage } from "@/lib/languageVersions";
import { executeCode, runTestCases } from "@/lib/codeExecution";
import { getPuzzleById } from "@/lib/puzzle";

/**
 * Piston API execution endpoint
 * Handles code execution requests
 * If puzzleId is provided, runs code against puzzle's public test cases
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const body = await request.json();
    const { code, language, puzzleId } = body;

    // Validate input
    if (!code || !language) {
      return NextResponse.json(
        { error: "Code and language are required" },
        { status: 400 }
      );
    }

    // Check if language is supported
    if (!isSupportedLanguage(language)) {
      return NextResponse.json(
        { error: `Unsupported language: ${language}` },
        { status: 400 }
      );
    }

    // If puzzleId is provided, run against test cases
    if (puzzleId) {
      const puzzle = await getPuzzleById(puzzleId);
      if (!puzzle) {
        return NextResponse.json(
          { error: "Puzzle not found" },
          { status: 404 }
        );
      }

      // Only run public test cases for execute endpoint
      const publicTestCases = puzzle.testCases.filter((tc) => tc.isPublic);

      if (publicTestCases.length === 0) {
        // If no public test cases, just execute the code without input
        const result = await executeCode(code, language);
        return NextResponse.json({
          output: result.output.split("\n") || [],
          error: result.error,
          exitCode: result.exitCode,
          testResults: null,
        });
      }

      const testResults = await runTestCases(code, language, publicTestCases);
      const allTestsPassed = testResults.every((result) => result.passed);

      return NextResponse.json({
        output: testResults.map((r) => r.output),
        error: testResults.find((r) => r.error)?.error || null,
        exitCode: testResults.find((r) => r.exitCode !== 0)?.exitCode || 0,
        testResults,
        allTestsPassed,
      });
    }

    // No puzzleId - just execute code without test cases
    const result = await executeCode(code, language);

    return NextResponse.json({
      output: result.output.split("\n") || [],
      error: result.error,
      exitCode: result.exitCode,
    });
  } catch (error) {
    console.error("Execution error:", error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Execution failed",
      },
      { status: 500 }
    );
  }
};
