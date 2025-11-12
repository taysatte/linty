"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/navbar/Navbar";
import { Card } from "@/components/ui/card";
import CodeEditor from "@/components/editor/CodeEditor";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import Output from "@/components/output/Output";
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
import { TestCase } from "@/generated/prisma";
import PuzzleDescClient from "@/components/desc/PuzzleDescClient";
import { type Language } from "@/lib/languageVersions";
import * as c from "@/components/puzzle/constants";
import {
  getAnonymousAttemptsLeft,
  incrementAnonymousAttempts,
} from "@/lib/attempts";
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
  const [isOutputOpen, setIsOutputOpen] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [testsPassed, setTestsPassed] = useState<boolean | null>(null);
  // Initialize with server value to match SSR (prevents hydration mismatch)
  const [attemptsLeft, setAttemptsLeft] = useState<number>(puzzle.attemptsLeft);

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

  const handleRunCode = async ({ code, language }: RunCodeProps) => {
    setIsLoading(true);
    setTestsPassed(null);
    setOutput([]);

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language, puzzleId: puzzle.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to execute code");
      }

      const data: ExecuteCodeResponse = await response.json();

      // Handle test results if available
      if (data.testResults) {
        setTestsPassed(data.allTestsPassed ?? false);
        setOutput(data.testResults.map((r) => r.output));
      } else if (data.error) {
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
  };

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

  const handleReset = () => {
    setCode(puzzle.starterCode);
  };

  return (
    <>
      <Navbar
        streak={c.TEST_STREAK_LENGTH}
        attemptsLeft={attemptsLeft}
        maxAttempts={c.MAX_ATTEMPTS}
        onSubmit={handleSubmit}
        isLoading={isLoading}
      />
      {/* Main content area */}
      <main className="h-[calc(100vh-64px)] px-2 md:px-4 pb-2">
        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden md:block h-full">
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
                    onReset={handleReset}
                    isLoading={isLoading}
                  />
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel
                  collapsible
                  collapsedSize={0}
                  defaultSize={c.OUTPUT_HORIZ_DEFAULT_SIZE}
                  className="pl-0 p-2"
                >
                  <Card className="shadow-lg font-mono h-full w-full gap-4 p-4">
                    <Output
                      output={output}
                      isLoading={isLoading}
                      testsPassed={testsPassed}
                    />
                  </Card>
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              defaultSize={c.PUZZLE_DESC_GROUP_DEFAULT_SIZE}
              className="pr-0 p-2"
            >
              <PuzzleDescClient puzzle={puzzle} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile Layout - Visible on mobile only */}
        <div className="md:hidden flex flex-col h-full gap-2">
          <CodeEditor
            value={code}
            onChange={setCode}
            language={language}
            onLanguageChange={setLanguage}
            onRunCode={handleRunCode}
            onReset={handleReset}
            isLoading={isLoading}
          />
          <PuzzleDescClient puzzle={puzzle} />
          <Collapsible open={isOutputOpen} onOpenChange={setIsOutputOpen}>
            <Card className="shadow-lg p-0">
              <CollapsibleTrigger className="w-full p-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-muted-foreground">
                  output
                </p>
                {isOutputOpen ? (
                  <ChevronUp className="text-muted-foreground/80 h-4 w-4" />
                ) : (
                  <ChevronDown className="text-muted-foreground/80 h-4 w-4" />
                )}
              </CollapsibleTrigger>
              <CollapsibleContent>
                <Card className="shadow-lg font-mono h-full w-full p-4 pt-3">
                  <div className="px-3 pb-3 max-h-[200px] overflow-auto">
                    <Output
                      output={output}
                      isLoading={isLoading}
                      testsPassed={testsPassed}
                    />
                  </div>
                </Card>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </main>
    </>
  );
};

export default PuzzlePageClient;
