"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PuzzlePageClientProps } from "../puzzle/PuzzlePageClient";
import { Item, ItemContent } from "@/components/ui/item";
import { Separator } from "../ui/separator";

const PuzzleDescClient = ({ puzzle }: PuzzlePageClientProps) => {
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false);

  const getDifficultyColor = (difficulty: string | null) => {
    const normalizedDifficulty = (difficulty || "easy").toLowerCase();
    if (normalizedDifficulty === "easy") {
      return "text-[var(--easy-puzzle)]";
    } else if (normalizedDifficulty === "medium") {
      return "text-[var(--medium-puzzle)]";
    } else if (normalizedDifficulty === "hard") {
      return "text-[var(--hard-puzzle)]";
    }
    return "text-muted-foreground";
  };

  const getDifficultyBgColor = (difficulty: string | null) => {
    const normalizedDifficulty = (difficulty || "easy").toLowerCase();
    if (normalizedDifficulty === "easy") {
      return "bg-[var(--easy-puzzle)]/5";
    } else if (normalizedDifficulty === "medium") {
      return "bg-[var(--medium-puzzle)]/5";
    } else if (normalizedDifficulty === "hard") {
      return "bg-[var(--hard-puzzle)]/5";
    }
    return "bg-primary/5";
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const DesktopVersion = () => {
    const difficulty = puzzle.difficulty || "easy";
    const difficultyColor = getDifficultyColor(puzzle.difficulty);

    return (
      <Card className="shadow-lg h-full w-full p-0 gap-0">
        <CardHeader className="p-4 gap-0 rounded-t-xl m-0">
          <CardTitle className="flex flex-row flex-wrap items-center gap-2 justify-between">
            <div className="text-2xl bg-accent/5 px-4 rounded-lg py-1 shadow-sm font-black text-primary">
              {puzzle.title.toLowerCase().trim().replaceAll(" ", "-")}
            </div>
            <div className="py-1 shadow-sm font-semibold font-mono text-lg bg-accent/5 px-4 rounded-lg text-muted-foreground">
              #{puzzle.id.toString().padStart(3, "0")}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col p-4 gap-4 bg-background/70 h-full rounded-b-xl border-t border-border">
          <div className="flex flex-wrap items-center justify-start gap-2">
            <Item
              variant="default"
              className={`py-1 px-3 rounded-full ${getDifficultyBgColor(
                difficulty
              )}`}
            >
              <ItemContent
                className={`text-md font-semibold ${difficultyColor}`}
              >
                {difficulty}
              </ItemContent>
            </Item>
            <div className="h-5">
              <Separator orientation="vertical" className="h-5" />
            </div>
            {puzzle.tags.map((tag) => (
              <Item
                key={tag}
                variant="default"
                className="bg-primary/5 hover:bg-primary/10 font-mono transition-colors duration-100 cursor-default py-1 px-3 rounded-full"
              >
                <ItemContent className="text-primary text-md font-semibold">
                  {tag}
                </ItemContent>
              </Item>
            ))}
          </div>
          <div className="text-sm text-muted-foreground whitespace-pre-wrap">
            {puzzle.description}
          </div>
          {puzzle.testCases && puzzle.testCases.length > 0 && (
            <div className="text-sm">
              <div className="font-semibold">Test Cases</div>
              <div className="w-full bg-border">
                <Separator
                  decorative
                  orientation="horizontal"
                  className="my-2"
                />
              </div>
              <div className="mt-2 space-y-2">
                {puzzle.testCases.map((testCase, index) => (
                  <div
                    key={testCase.id}
                    className="p-2 rounded-lg bg-muted/10 border border-border"
                  >
                    <div className="font-medium text-sm text-muted-foreground mb-1">
                      Test Case {index + 1}
                    </div>
                    <div className="text-sm space-y-1.5">
                      <div>
                        <span className="font-semibold">Input:</span>{" "}
                        <code className="px-1 py-0.5 rounded-sm bg-muted/20 text-sm">
                          {testCase.input}
                        </code>
                      </div>
                      <div>
                        <span className="font-semibold">Expected:</span>{" "}
                        <code className="px-1 py-0.5 rounded-sm bg-muted/20 text-sm">
                          {testCase.expectedOutput}
                        </code>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="w-full">
            <Separator decorative orientation="horizontal" />
          </div>
          {puzzle.hints && (
            <details className="text-sm">
              <summary className="cursor-pointer font-semibold">Hints</summary>
              <div className="mt-2 text-muted-foreground whitespace-pre-wrap">
                {puzzle.hints}
              </div>
            </details>
          )}
        </CardContent>
      </Card>
    );
  };

  const MobileVersion = () => (
    <Collapsible open={isPuzzleOpen} onOpenChange={setIsPuzzleOpen}>
      <Card className="shadow-lg p-0">
        <CollapsibleTrigger className="w-full p-3 flex items-center justify-between transition-all duration-100 hover:bg-primary/5">
          <div className="text-sm bg-primary/5 px-3 py-1.5 rounded-lg font-black text-primary">
            {puzzle.title.toLowerCase().replaceAll(" ", "-")}
          </div>
          {isPuzzleOpen ? (
            <ChevronUp className="text-muted-foreground/80 h-5 w-5" />
          ) : (
            <ChevronDown className="text-muted-foreground/80 h-5 w-5" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-3 pb-3">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {puzzle.description}
            </p>
            {puzzle.testCases && puzzle.testCases.length > 0 && (
              <div className="mt-2 text-sm">
                <div className="cursor-pointer font-semibold">Test Cases</div>
                <div className="w-full bg-border">
                  <Separator
                    decorative
                    orientation="horizontal"
                    className="my-2"
                  />
                </div>
                <div className="mt-2 space-y-2">
                  {puzzle.testCases.map((testCase, index) => (
                    <div
                      key={testCase.id}
                      className="p-2 rounded-lg bg-muted/10 border border-border"
                    >
                      <div className="font-medium text-xs text-muted-foreground mb-1">
                        Test Case {index + 1}
                      </div>
                      <div className="text-xs space-y-1.5">
                        <div>
                          <span className="font-semibold">Input:</span>{" "}
                          <code className="px-1 py-0.5 rounded-sm bg-muted/20 text-xs">
                            {testCase.input}
                          </code>
                        </div>
                        <div>
                          <span className="font-semibold">Expected:</span>{" "}
                          <code className="px-1 py-0.5 rounded-sm bg-muted/20 text-xs">
                            {testCase.expectedOutput}
                          </code>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {puzzle.hints && (
              <details className="mt-2 text-sm">
                <summary className="cursor-pointer font-semibold">
                  Hints
                </summary>
                <div className="mt-2 text-muted-foreground whitespace-pre-wrap">
                  {puzzle.hints}
                </div>
              </details>
            )}
          </div>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );

  return (
    <>
      {/* Desktop Version - Hidden on mobile */}
      <div className="hidden md:block h-full">
        <DesktopVersion />
      </div>
      {/* Mobile Version - Visible on mobile only */}
      <div className="md:hidden">
        <MobileVersion />
      </div>
    </>
  );
};

export default PuzzleDescClient;
