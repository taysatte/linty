"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Navbar from "@/components/navbar/Navbar";
import { Card } from "@/components/ui/card";
import CodeEditor from "@/components/editor/CodeEditor";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import * as ResizablePrimitive from "react-resizable-panels";
import OutputPane from "@/components/output/OutputPane";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import {
  RunCodeProps,
  SubmitPuzzleProps,
  SubmitPuzzleResponse,
  ExecuteCodeResponse,
} from "@/components/puzzle/types";
import { TestCase } from "../../generated/prisma/client";
import PuzzleDescClient from "@/components/desc/PuzzleDescClient";
import { type Language } from "@/lib/languageVersions";
import * as c from "@/components/puzzle/constants";
import {
  getAnonymousAttemptsLeft,
  incrementAnonymousAttempts,
} from "@/lib/attempts";
import PuzzleTestCases, {
  PuzzleTestCasesRef,
} from "../testCases/PuzzleTestCases";

/**
 * Props for the DesktopLayout component.
 *
 * DesktopLayout renders a multi-panel layout optimized for larger screens:
 * - Left side: Code editor and output panes (vertically stacked)
 * - Right side: Puzzle description and test cases (vertically stacked)
 */
interface DesktopLayoutProps {
  code: string;
  language: Language;
  output: string[];
  isLoading: boolean;
  testsPassed: boolean | null;
  puzzle: PuzzlePageClientProps["puzzle"];
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  handleRunCode: (props: RunCodeProps) => Promise<void>;
  handleRunTests: (props: RunCodeProps) => Promise<void>;
  handleReset: () => void;
  testCasesRef: React.RefObject<PuzzleTestCasesRef | null>;
}

/**
 * DesktopLayout Component
 *
 * Renders the puzzle page layout for desktop/tablet screens (md breakpoint and above).
 * Uses resizable panels to allow users to adjust the size of different sections.
 *
 * Layout structure:
 * - Horizontal panel group containing:
 *   - Left panel (65% default): Editor/Output vertical group
 *     - Editor panel (70% default)
 *     - Output panel (30% default, collapsible)
 *   - Right panel (35% default): Description/Test cases vertical group
 *     - Description panel (60% default)
 *     - Test cases panel (40% default)
 */
const DesktopLayout = ({
  code,
  language,
  output,
  isLoading,
  testsPassed,
  puzzle,
  setCode,
  setLanguage,
  handleRunCode,
  handleRunTests,
  handleReset,
  testCasesRef,
}: DesktopLayoutProps) => {
  // Ref to control the output panel's collapse/expand state
  const outputPanelRef = useRef<ResizablePrimitive.ImperativePanelHandle>(null);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);

  /**
   * Toggles the output panel between collapsed and expanded states.
   * When collapsed, the panel shows only the header button.
   */
  const handleToggleOutput = () => {
    if (outputPanelRef.current) {
      if (outputPanelRef.current.isCollapsed()) {
        outputPanelRef.current.expand();
        setIsOutputCollapsed(false);
      } else {
        outputPanelRef.current.collapse();
        setIsOutputCollapsed(true);
      }
    }
  };

  return (
    <>
      <main className="h-[calc(100vh-64px)] px-2 md:px-4 pb-2">
        <div className="h-full" suppressHydrationWarning>
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={c.EDITOR_OUTPUT_GROUP_DEFAULT_SIZE}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel
                  defaultSize={c.EDITOR_HORIZ_DEFAULT_SIZE}
                  className="pl-0 p-2"
                >
                  <CodeEditor
                    value={code}
                    onChange={setCode}
                    language={language}
                    onLanguageChange={setLanguage}
                    onRunCode={handleRunCode}
                    onRunTests={handleRunTests}
                    onReset={handleReset}
                    isLoading={isLoading}
                  />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel
                  ref={outputPanelRef}
                  collapsible
                  collapsedSize={c.OUTPUT_COLLAPSED_SIZE}
                  minSize={c.OUTPUT_MIN_SIZE}
                  defaultSize={c.OUTPUT_HORIZ_DEFAULT_SIZE}
                  className="pl-0 p-2"
                  onCollapse={() => setIsOutputCollapsed(true)}
                  onExpand={() => setIsOutputCollapsed(false)}
                >
                  <OutputPane
                    variant="desktop"
                    output={output}
                    isLoading={isLoading}
                    testsPassed={testsPassed}
                    onToggleCollapse={handleToggleOutput}
                    isCollapsed={isOutputCollapsed}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              defaultSize={c.PUZZLE_DESC_GROUP_DEFAULT_SIZE}
              className="pr-0 p-2 relative"
            >
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel
                  defaultSize={c.PUZZLE_DESC_VERTICAL_DEFAULT_SIZE}
                  className="pb-2"
                >
                  <PuzzleDescClient puzzle={puzzle} />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel
                  defaultSize={c.TESTS_PANE_VERTICAL_DEFAULT_SIZE}
                  className="pt-2"
                >
                  <PuzzleTestCases
                    ref={testCasesRef}
                    testCases={puzzle.testCases}
                    isLoading={isLoading}
                    code={code}
                    language={language}
                    puzzleId={puzzle.id}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </main>
    </>
  );
};

/**
 * Props for the MobileLayout component.
 *
 * MobileLayout renders a vertical stack layout optimized for mobile screens:
 * - Puzzle description at the top
 * - Code editor in the middle
 * - Output pane below the editor
 * - Collapsible test cases section at the bottom
 */
interface MobileLayoutProps {
  code: string;
  language: Language;
  output: string[];
  isLoading: boolean;
  testsPassed: boolean | null;
  puzzle: PuzzlePageClientProps["puzzle"];
  isTestsOpen: boolean;
  setCode: React.Dispatch<React.SetStateAction<string>>;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
  setIsTestsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleRunCode: (props: RunCodeProps) => Promise<void>;
  handleRunTests: (props: RunCodeProps) => Promise<void>;
  handleReset: () => void;
  testCasesRef: React.RefObject<PuzzleTestCasesRef | null>;
}

/**
 * MobileLayout Component
 *
 * Renders the puzzle page layout for mobile screens (below md breakpoint).
 * Uses a vertical flex layout with collapsible sections to maximize screen space.
 *
 * Layout structure (top to bottom):
 * 1. Puzzle description (always visible)
 * 2. Code editor (always visible)
 * 3. Output pane (always visible, collapsible content)
 * 4. Test cases (collapsible section)
 */
const MobileLayout = ({
  code,
  language,
  output,
  isLoading,
  testsPassed,
  puzzle,
  isTestsOpen,
  setCode,
  setLanguage,
  setIsTestsOpen,
  handleRunCode,
  handleRunTests,
  handleReset,
  testCasesRef,
}: MobileLayoutProps) => {
  return (
    <>
      <main className="h-[calc(100vh-64px)] px-2 md:px-4 pb-2">
        <div className="flex flex-col h-full gap-2" suppressHydrationWarning>
          <PuzzleDescClient puzzle={puzzle} />
          <CodeEditor
            value={code}
            onChange={setCode}
            language={language}
            onLanguageChange={setLanguage}
            onRunCode={handleRunCode}
            onRunTests={handleRunTests}
            onReset={handleReset}
            isLoading={isLoading}
          />
          <OutputPane
            variant="mobile"
            output={output}
            isLoading={isLoading}
            testsPassed={testsPassed}
          />
          <Collapsible open={isTestsOpen} onOpenChange={setIsTestsOpen}>
            <Card className="p-0">
              <CollapsibleTrigger className="w-full p-3 flex items-center justify-between">
                <p className="text-md font-black text-foreground/80">
                  Test Cases
                </p>
                {isTestsOpen ? (
                  <ChevronUp className="text-muted-foreground/80 h-4 w-4" />
                ) : (
                  <ChevronDown className="text-muted-foreground/80 h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <PuzzleTestCases
                  ref={testCasesRef}
                  testCases={puzzle.testCases}
                  isLoading={isLoading}
                  code={code}
                  language={language}
                  puzzleId={puzzle.id}
                />
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </main>
    </>
  );
};

/**
 * Props for the main PuzzlePageClient component.
 *
 * @property puzzle - The puzzle data including metadata, starter code, test cases, and attempts remaining
 */
export interface PuzzlePageClientProps {
  puzzle: {
    id: number;
    dailyPuzzleId: number;
    date: string;
    title: string;
    description: string;
    instructions: string | null;
    starterCode: string;
    difficulty: string | null;
    language: string | null;
    hints: string | null;
    tags: string[];
    testCases: TestCase[];
    attemptsLeft: number;
  };
}

/**
 * PuzzlePageClient Component
 *
 * Main client component for the puzzle solving page. Handles:
 * - Code editing and execution
 * - Test case execution
 * - Puzzle submission
 * - Attempt tracking (authenticated and anonymous users)
 * - Responsive layout (desktop vs mobile)
 *
 * State Management:
 * - Code: Current editor content (initialized with starter code)
 * - Language: Selected programming language
 * - Output: Execution output or error messages
 * - isLoading: Loading state for async operations
 * - testsPassed: Whether all tests passed (null = not yet tested)
 * - attemptsLeft: Remaining submission attempts
 *
 * Anonymous User Handling:
 * - Attempts are tracked in localStorage for anonymous users
 * - Server-provided attempts are used for authenticated users
 * - Attempts are synced after hydration to avoid SSR/client mismatch
 *
 * @param props - Component props containing puzzle data
 * @returns The rendered puzzle page with appropriate layout for screen size
 */
const PuzzlePageClient = ({ puzzle }: PuzzlePageClientProps) => {
  const [code, setCode] = useState<string>(puzzle.starterCode);
  const [language, setLanguage] = useState<Language>("javascript");
  const [output, setOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [testsPassed, setTestsPassed] = useState<boolean | null>(null);
  const [isTestsOpen, setIsTestsOpen] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(puzzle.attemptsLeft);

  /**
   * Syncs attemptsLeft after hydration to handle anonymous user tracking.
   *
   * This is necessary because:
   * - Server-side rendering doesn't have access to localStorage
   * - Anonymous users' attempts are stored in localStorage
   * - We need to update the state after client-side hydration
   *
   * Authenticated users: Use server-provided attemptsLeft value
   * Anonymous users: Calculate from localStorage (MAX_ATTEMPTS - stored attempts)
   */
  useEffect(() => {
    // If user is authenticated (attemptsLeft < MAX_ATTEMPTS), use server value
    // Otherwise, check localStorage for anonymous attempts
    if (puzzle.attemptsLeft < c.MAX_ATTEMPTS) {
      setAttemptsLeft(puzzle.attemptsLeft);
    } else {
      // User is anonymous, check localStorage
      const anonymousAttempts = getAnonymousAttemptsLeft(puzzle.id);
      setAttemptsLeft(anonymousAttempts);
    }
  }, [puzzle.id, puzzle.attemptsLeft]);

  /**
   * Executes user code without submitting to the puzzle.
   *
   * This is a "run" operation that:
   * - Sends code to /api/execute endpoint
   * - Displays output or errors in the output pane
   * - Does NOT count as a submission attempt
   * - Does NOT run test cases
   *
   * @param props - Code and language to execute
   */
  const handleRunCode = useCallback(
    async ({ code, language }: RunCodeProps) => {
      setIsLoading(true);
      setTestsPassed(null);
      setOutput([]);

      try {
        const response = await fetch("/api/execute", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code, language }), // No puzzleId - just run code
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to execute code");
        }

        const data: ExecuteCodeResponse = await response.json();

        if (data.error) {
          setOutput([data.error]);
          setTestsPassed(false);
        } else {
          setOutput(data.output || []);
          setTestsPassed(null);
        }
      } catch (error) {
        // Handle errors
        const errorMessage =
          error instanceof Error ? error.message : "Execution failed";
        setOutput([`Error: ${errorMessage}`]);
        setTestsPassed(false);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Ref to access test cases component methods (e.g., runAllTests)
  const testCasesRef = useRef<PuzzleTestCasesRef>(null);

  /**
   * Runs all test cases for the current code without submitting.
   *
   * This triggers the test execution in the PuzzleTestCases component
   * but does not count as a submission attempt. Useful for testing
   * code before submitting.
   *
   * @param props - Code and language to test
   */
  const handleRunTests = useCallback(
    async ({ code, language }: RunCodeProps) => {
      // Just trigger running all tests in the test cases component
      // Don't update output window or loading state
      if (testCasesRef.current) {
        await testCasesRef.current.runAllTests();
      }
    },
    []
  );

  /**
   * Submits the puzzle solution for evaluation.
   *
   * This is the official submission that:
   * - Validates attempts remaining
   * - Calculates time taken from puzzle start
   * - Sends submission to /api/submit endpoint
   * - Updates attemptsLeft (server for authenticated, localStorage for anonymous)
   * - Displays test results in the output pane
   * - Sets testsPassed state based on results
   *
   * Attempt tracking:
   * - Authenticated users: Server manages attempts
   * - Anonymous users: Attempts tracked in localStorage
   * - Attempts decrement regardless of pass/fail
   */
  const handleSubmit = async () => {
    // Check if user has attempts left (for anonymous users, check localStorage)
    const currentAttempts = attemptsLeft;
    if (currentAttempts <= 0) {
      setOutput(["No attempts remaining. Please try again tomorrow!"]);
      return;
    }

    setIsLoading(true);
    setTestsPassed(null);
    setOutput([]);

    // Calculate time taken from the start of the puzzle's day
    const puzzleStartTime = new Date(puzzle.date).getTime();
    const timeTaken = Math.floor((Date.now() - puzzleStartTime) / 1000);

    const submitData: SubmitPuzzleProps = {
      code,
      language,
      puzzleId: puzzle.id,
      timeTaken,
    };

    const response = await fetch("api/submit", {
      method: "POST",
      body: JSON.stringify(submitData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      setOutput([errorData.error || "Failed to submit puzzle"]);
      return;
    }

    const data: SubmitPuzzleResponse = await response.json();

    // Update attempts based on authentication status
    if (data.attemptsLeft !== null) {
      // User is authenticated, use server value
      setAttemptsLeft(data.attemptsLeft);
    } else {
      // User is anonymous, track in localStorage
      const newAttempts = incrementAnonymousAttempts(
        puzzle.id,
        data.allTestsPassed
      );
      setAttemptsLeft(c.MAX_ATTEMPTS - newAttempts);
    }

    setTestsPassed(data.allTestsPassed);
    setOutput(data.testResults.map((result) => result.output));
    setIsLoading(false);
  };

  /**
   * Resets the code editor to the original starter code.
   *
   * Useful for starting over or clearing accidental changes.
   */
  const handleReset = useCallback(() => {
    setCode(puzzle.starterCode);
  }, [puzzle.starterCode]);

  return (
    <>
      <Navbar
        streak={c.TEST_STREAK_LENGTH}
        attemptsLeft={attemptsLeft}
        maxAttempts={c.MAX_ATTEMPTS}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      <div className="hidden md:block h-full">
        <DesktopLayout
          code={code}
          language={language}
          output={output}
          isLoading={isLoading}
          testsPassed={testsPassed}
          puzzle={puzzle}
          setCode={setCode}
          setLanguage={setLanguage}
          handleRunCode={handleRunCode}
          handleRunTests={handleRunTests}
          handleReset={handleReset}
          testCasesRef={testCasesRef}
        />
      </div>
      <div className="md:hidden">
        <MobileLayout
          code={code}
          language={language}
          output={output}
          isLoading={isLoading}
          testsPassed={testsPassed}
          puzzle={puzzle}
          isTestsOpen={isTestsOpen}
          setCode={setCode}
          setLanguage={setLanguage}
          setIsTestsOpen={setIsTestsOpen}
          handleRunCode={handleRunCode}
          handleRunTests={handleRunTests}
          handleReset={handleReset}
          testCasesRef={testCasesRef}
        />
      </div>
    </>
  );
};

export default PuzzlePageClient;
