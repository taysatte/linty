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
  const outputPanelRef = useRef<ResizablePrimitive.ImperativePanelHandle>(null);
  const [isOutputCollapsed, setIsOutputCollapsed] = useState(false);

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

const PuzzlePageClient = ({ puzzle }: PuzzlePageClientProps) => {
  const [code, setCode] = useState<string>(puzzle.starterCode);
  const [language, setLanguage] = useState<Language>("javascript");
  const [output, setOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [testsPassed, setTestsPassed] = useState<boolean | null>(null);
  const [isTestsOpen, setIsTestsOpen] = useState(false);
  const [attemptsLeft, setAttemptsLeft] = useState<number>(puzzle.attemptsLeft);

  // TODO: Find better solution for this
  // After hydration, update attemptsLeft from localStorage for anonymous users
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

  const testCasesRef = useRef<PuzzleTestCasesRef>(null);

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
