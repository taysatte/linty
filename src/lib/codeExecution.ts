import { getPistonApiUrl } from "@/lib/pistonApi";
import { getLanguageVersion, type Language } from "@/lib/languageVersions";
import { TestCase } from "@/generated/prisma";
import { ExecuteCodeResponse } from "@/components/puzzle/types";

/**
 * Result of executing code against a single test case
 */
export interface TestResult {
  testCaseId: number;
  passed: boolean;
  output: string;
  expectedOutput: string;
  error: string | null;
  exitCode: number;
}

/**
 * Sleep for a given number of milliseconds
 */
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Execute code using Piston API with retry logic for rate limiting
 * @param code - The code to execute
 * @param language - The programming language
 * @param stdin - Optional input to pass to the program
 * @param retries - Number of retries remaining (default: 3)
 * @returns Execution result with output, error, and exit code
 */
export const executeCode = async (
  code: string,
  language: Language,
  stdin?: string,
  retries: number = 3
): Promise<{
  output: string;
  error: string | null;
  exitCode: number;
}> => {
  const version = getLanguageVersion(language);
  if (!version) {
    throw new Error(`No version found for language: ${language}`);
  }

  const executeUrl = getPistonApiUrl("EXECUTE");

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(executeUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          language,
          version,
          files: [
            {
              content: code,
            },
          ],
          ...(stdin !== undefined && { stdin }),
        }),
      });

      // Handle rate limiting with retry
      if (
        response.status === 429 ||
        response.statusText.includes("Too Many Requests")
      ) {
        if (attempt < retries) {
          // Exponential backoff: wait 1s, 2s, 4s, etc.
          const delay = Math.pow(2, attempt) * 1000;
          await sleep(delay);
          continue;
        }
        throw new Error(`Piston API error: Too Many Requests (rate limited)`);
      }

      if (!response.ok) {
        throw new Error(`Piston API error: ${response.statusText}`);
      }

      const result = await response.json();
      return {
        output: result.run?.stdout || "",
        error: result.run?.stderr || null,
        exitCode: result.run?.code || 0,
      };
    } catch (error) {
      // If it's a rate limit error and we have retries left, retry
      if (
        attempt < retries &&
        error instanceof Error &&
        error.message.includes("Too Many Requests")
      ) {
        const delay = Math.pow(2, attempt) * 1000;
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }

  throw new Error("Failed to execute code after retries");
};

/**
 * Wrap user code to inject test case inputs and execute the function
 * @param code - The user's code (function definition)
 * @param input - The test case input string (format: "console.log(functionName(...))")
 * @param language - The programming language
 * @returns Wrapped code that executes the function with test inputs
 */
const wrapCodeWithTestInput = (
  code: string,
  input: string,
  language: Language
): string => {
  if (language === "javascript") {
    // Test cases already have the correct function names, just append them
    return `${code}\n\n// Test execution\n${input};`;
  }

  // For other languages, return code as-is (stdin approach)
  return code;
};

/**
 * Execute code against a single test case
 * @param code - The code to execute
 * @param language - The programming language
 * @param testCase - The test case to run against
 * @returns Test result indicating if the test passed
 */
export const runTestCase = async (
  code: string,
  language: Language,
  testCase: TestCase
): Promise<TestResult> => {
  try {
    // Wrap code to inject test inputs and execute the function
    const wrappedCode = wrapCodeWithTestInput(code, testCase.input, language);

    // Execute the wrapped code (no stdin needed for JavaScript)
    const result = await executeCode(
      wrappedCode,
      language,
      language === "javascript" ? undefined : testCase.input
    );

    const output = result.output.trim();
    const expectedOutput = testCase.expectedOutput.trim();

    // Normalize output by removing spaces after commas and around brackets
    // console.log formats arrays as "[ 0, 1 ]" but expected is "[0, 1]"
    const normalizeOutput = (str: string): string => {
      return str
        .replace(/\s*,\s*/g, ", ") // Normalize comma spacing to ", "
        .replace(/\s*\[\s*/g, "[") // Remove spaces after opening bracket
        .replace(/\s*\]\s*/g, "]"); // Remove spaces before closing bracket
    };

    const normalizedOutput = normalizeOutput(output);
    const normalizedExpected = normalizeOutput(expectedOutput);

    // Check if test passed
    const passed =
      result.exitCode === 0 &&
      !result.error &&
      normalizedOutput === normalizedExpected;

    return {
      testCaseId: testCase.id,
      passed,
      output,
      expectedOutput,
      error: result.error,
      exitCode: result.exitCode,
    };
  } catch (error) {
    return {
      testCaseId: testCase.id,
      passed: false,
      output: "",
      expectedOutput: testCase.expectedOutput.trim(),
      error: error instanceof Error ? error.message : "Test execution failed",
      exitCode: -1,
    };
  }
};

/**
 * Execute code against multiple test cases with throttling to avoid rate limits
 * @param code - The code to execute
 * @param language - The programming language
 * @param testCases - Array of test cases to run against
 * @param delayBetweenTests - Delay in ms between test executions (default: 200ms)
 * @returns Array of test results
 */
export const runTestCases = async (
  code: string,
  language: Language,
  testCases: TestCase[],
  delayBetweenTests: number = 200
): Promise<TestResult[]> => {
  const results: TestResult[] = [];

  // Execute tests sequentially with delays to avoid rate limiting
  for (let i = 0; i < testCases.length; i++) {
    const result = await runTestCase(code, language, testCases[i]);
    results.push(result);

    // Add delay between tests (except for the last one)
    if (i < testCases.length - 1 && delayBetweenTests > 0) {
      await sleep(delayBetweenTests);
    }
  }

  return results;
};
