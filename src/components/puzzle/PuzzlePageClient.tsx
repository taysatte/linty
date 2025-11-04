"use client";

import React, { useState } from "react";
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
import { RunCodeProps } from "@/app/types";
import PuzzleDescClient from "@/components/puzzle/PuzzleDescClient";

export interface PuzzlePageClientProps {
  puzzle: {
    id: number;
    dailyPuzzleId: number;
    date: string;
    title: string;
    description: string;
    starterCode: string;
    difficulty: string | null;
    language: string | null;
    hints: string | null;
    testCases: Array<{
      id: number;
      input: string;
      expectedOutput: string;
      isPublic: boolean;
    }>;
  };
}

const PuzzlePageClient = ({ puzzle }: PuzzlePageClientProps) => {
  const EDITOR_OUTPUT_GROUP_DEFAULT_SIZE = 65;
  const PUZZLE_DESC_GROUP_DEFAULT_SIZE = 35;
  const EDITOR_HORIZ_DEFAULT_SIZE = 95;
  const OUTPUT_HORIZ_DEFAULT_SIZE = 5;
  const [isOutputOpen, setIsOutputOpen] = useState(false);
  const [output, setOutput] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [testsPassed, setTestsPassed] = useState<boolean | null>(null);
  // TODO: Track submission attempts - fetch from API or manage in state
  const [attemptsLeft, setAttemptsLeft] = useState<number | null>(3);
  const maxAttempts = 3;

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
        body: JSON.stringify({ code, language }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to execute code");
      }

      const data = await response.json();
      if (data.error) {
        setOutput([data.error]);
      } else {
        setOutput(data.output || []);
      }

      // TODO: Update testsPassed based on test results when implemented
      setTestsPassed(null);
    } catch (error) {
      // Handle errors
      const errorMessage =
        error instanceof Error ? error.message : "Execution failed";
      setOutput([`Error: ${errorMessage}`]);
      setTestsPassed(null);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar
        streak={5}
        attemptsLeft={attemptsLeft}
        maxAttempts={maxAttempts}
      />
      {/* Main content area */}
      <main className="h-[calc(100vh-64px)] px-2 md:px-4 pb-2">
        {/* Desktop Layout - Hidden on mobile */}
        <div className="hidden md:block h-full">
          <ResizablePanelGroup direction="horizontal">
            <ResizablePanel defaultSize={EDITOR_OUTPUT_GROUP_DEFAULT_SIZE}>
              <ResizablePanelGroup direction="vertical">
                <ResizablePanel
                  defaultSize={EDITOR_HORIZ_DEFAULT_SIZE}
                  className="pl-0 p-2"
                >
                  <CodeEditor
                    onRunCode={handleRunCode}
                    isLoading={isLoading}
                    initialCode={puzzle.starterCode}
                    attemptsLeft={attemptsLeft ?? undefined}
                    maxAttempts={maxAttempts}
                  />
                  <ResizableHandle />
                </ResizablePanel>
                <ResizablePanel
                  collapsible
                  collapsedSize={0}
                  defaultSize={OUTPUT_HORIZ_DEFAULT_SIZE}
                  className="pl-0 p-2"
                >
                  <Output
                    output={output}
                    isLoading={isLoading}
                    testsPassed={testsPassed}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel
              defaultSize={PUZZLE_DESC_GROUP_DEFAULT_SIZE}
              className="pr-0 p-2"
            >
              <PuzzleDescClient puzzle={puzzle} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>

        {/* Mobile Layout - Visible on mobile only */}
        <div className="md:hidden flex flex-col h-full gap-2">
          <CodeEditor
            onRunCode={handleRunCode}
            isLoading={isLoading}
            initialCode={puzzle.starterCode}
            attemptsLeft={attemptsLeft ?? undefined}
            maxAttempts={maxAttempts}
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
                <div className="px-3 pb-3 max-h-[200px] overflow-auto">
                  <Output
                    output={output}
                    isLoading={isLoading}
                    testsPassed={testsPassed}
                  />
                </div>
              </CollapsibleContent>
            </Card>
          </Collapsible>
        </div>
      </main>
    </>
  );
};

export default PuzzlePageClient;
