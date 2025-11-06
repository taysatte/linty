"use client";

import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PuzzlePageClientProps } from "@/components/puzzle/PuzzlePageClient";
import { Item, ItemContent } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const DesktopVersion = () => {
    const difficulty = puzzle.difficulty || "easy";
    const difficultyColor = getDifficultyColor(puzzle.difficulty);

    return (
      <Card className="shadow-lg h-full w-full p-0 gap-0 flex flex-col bg-background/70">
        <CardHeader className="p-4 gap-0 rounded-t-xl m-0 shrink-0 bg-card">
          <CardTitle className="flex flex-row flex-wrap items-center gap-2 justify-between">
            <div className="text-2xl font-black text-primary bg-primary/5 px-4 rounded-lg py-1 shadow-sm">
              {puzzle.title.toLowerCase().trim().replaceAll(" ", "-")}
            </div>
            <div className="py-1 shadow-sm font-semibold font-mono text-lg bg-accent/5 px-4 rounded-lg text-muted-foreground">
              #{puzzle.id.toString().padStart(3, "0")}
            </div>
          </CardTitle>
        </CardHeader>
        <ScrollArea
          scrollHideDelay={100}
          className="flex-1 min-h-0 w-full rounded-b-xl"
        >
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
                  className="bg-accent/5 hover:bg-accent/10 transition-colors duration-100 cursor-default py-1 px-3 rounded-full"
                >
                  <ItemContent className="text-accent/80 text-md font-semibold">
                    {tag}
                  </ItemContent>
                </Item>
              ))}
            </div>
            <div className="font-bold text-md text-foreground/90">
              description
            </div>
            <div className="text-sm text-foreground/90 [&_code]:px-1 [&_code]:py-0 [&_code]:rounded-sm [&_code]:bg-muted/20 [&_code]:text-sm [&_code]:font-mono [&_p]:mb-2 [&_p:last-child]:mb-0 [&_pre]:bg-muted/10 [&_pre]:p-2 [&_pre]:rounded [&_pre]:overflow-x-auto [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {puzzle.description}
              </ReactMarkdown>
            </div>
            {puzzle.instructions && (
              <>
                <div className="font-bold text-md text-foreground/90">
                  instructions
                </div>
                <div className="p-3 text-sm text-foreground/80 rounded-lg bg-border/50 border border-border/50 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:bg-muted/30 [&_code]:text-sm [&_code]:font-mono [&_p]:mb-1.5 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {puzzle.instructions}
                  </ReactMarkdown>
                </div>
              </>
            )}
            {puzzle.testCases && puzzle.testCases.length > 0 && (
              <div className="font-bold text-md text-foreground/90">
                test cases
                <div className="mt-2 p-2 rounded-lg space-y-4">
                  {puzzle.testCases.map((testCase, index) => (
                    <div
                      key={testCase.id}
                      className="p-2 py-0 pl-4 border-l-2 border-border"
                    >
                      <div className="text-sm space-y-1.5">
                        <div>
                          <span className="font-semibold text-foreground/90">
                            Input:
                          </span>{" "}
                          <code className="px-1 py-0.5 rounded-sm font-normal bg-muted/20 text-sm">
                            {testCase.input}
                          </code>
                        </div>
                        <div>
                          <span className="font-semibold text-foreground/90">
                            Expected:
                          </span>{" "}
                          <code className="px-1 py-0.5 rounded-sm font-normal bg-muted/20 text-sm">
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
              <Collapsible className="group">
                <CollapsibleTrigger className="flex items-center justify-between w-full cursor-pointer hover:bg-accent/5 rounded-md px-2 py-1.5 transition-colors">
                  <div className="font-bold text-foreground/90 text-md">
                    hints
                  </div>
                  <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-2 rounded-xl text-sm">
                  <div className="text-muted-foreground rounded-xl bg-accent/5 p-4 [&_code]:px-1 [&_code]:py-0 [&_code]:rounded-sm [&_code]:bg-muted/20 [&_code]:text-sm [&_code]:font-mono [&_p]:mb-2 [&_p:last-child]:mb-0 [&_pre]:bg-muted/10 [&_pre]:p-2 [&_pre]:rounded [&_pre]:overflow-x-auto [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {puzzle.hints}
                    </ReactMarkdown>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            )}
          </CardContent>
        </ScrollArea>
      </Card>
    );
  };

  const MobileVersion = () => {
    const difficulty = puzzle.difficulty || "easy";
    const difficultyColor = getDifficultyColor(puzzle.difficulty);

    return (
      <Collapsible open={isPuzzleOpen} onOpenChange={setIsPuzzleOpen}>
        <Card className="shadow-lg p-0 gap-0 flex flex-col bg-background/70">
          <CardHeader className="p-4 gap-0 rounded-t-xl m-0 shrink-0 bg-card">
            <CollapsibleTrigger className="cursor-pointer w-full flex items-center justify-between transition-all duration-100 hover:bg-primary/5 rounded-md px-2 py-1 -my-1">
              <CardTitle className="flex flex-row flex-wrap items-center gap-2 justify-between w-full">
                <div className="text-lg font-black text-primary">
                  {puzzle.title.toLowerCase().trim().replaceAll(" ", "-")}
                </div>
                <div className="py-2 shadow-sm font-semibold font-mono text-md bg-accent/5 px-4 rounded-lg text-muted-foreground">
                  #{puzzle.id.toString().padStart(3, "0")}
                </div>
              </CardTitle>
              {isPuzzleOpen ? (
                <ChevronUp className="text-muted-foreground/80 h-5 w-5 ml-2" />
              ) : (
                <ChevronDown className="text-muted-foreground/80 h-5 w-5 ml-2" />
              )}
            </CollapsibleTrigger>
          </CardHeader>
          <CollapsibleContent>
            <CardContent className="flex flex-col p-4 gap-4 bg-background/70 rounded-b-xl border-t border-border">
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
                    className="bg-accent/5 hover:bg-accent/10 transition-colors duration-100 cursor-default py-1 px-3 rounded-full"
                  >
                    <ItemContent className="text-accent/80 text-md font-semibold">
                      {tag}
                    </ItemContent>
                  </Item>
                ))}
              </div>
              <div className="font-bold text-md text-foreground/90">
                description
              </div>
              <div className="text-sm text-foreground/90 [&_code]:px-1 [&_code]:py-0 [&_code]:rounded-sm [&_code]:bg-muted/20 [&_code]:text-sm [&_code]:font-mono [&_p]:mb-2 [&_p:last-child]:mb-0 [&_pre]:bg-muted/10 [&_pre]:p-2 [&_pre]:rounded [&_pre]:overflow-x-auto [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {puzzle.description}
                </ReactMarkdown>
              </div>
              {/* {puzzle.instructions && (
                <>
                  <div className="font-bold text-md text-foreground/90">
                    instructions
                  </div>
                  <div className="p-3 text-sm text-foreground/80 rounded-lg bg-border/50 border border-border/50 [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:bg-muted/30 [&_code]:text-sm [&_code]:font-mono [&_p]:mb-1.5 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1">
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {puzzle.instructions}
                    </ReactMarkdown>
                  </div>
                </>
              )} */}
              {puzzle.testCases && puzzle.testCases.length > 0 && (
                <div className="font-bold text-md text-foreground/90">
                  test cases
                  <div className="mt-2 p-2 rounded-lg space-y-4">
                    {puzzle.testCases.map((testCase, index) => (
                      <div
                        key={testCase.id}
                        className="p-2 py-0 pl-4 border-l-2 border-border"
                      >
                        <div className="text-sm space-y-1.5">
                          <div>
                            <span className="font-semibold text-foreground/90">
                              Input:
                            </span>{" "}
                            <code className="px-1 py-0.5 rounded-sm font-normal bg-muted/20 text-sm">
                              {testCase.input}
                            </code>
                          </div>
                          <div>
                            <span className="font-semibold text-foreground/90">
                              Expected:
                            </span>{" "}
                            <code className="px-1 py-0.5 rounded-sm font-normal bg-muted/20 text-sm">
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
                <Collapsible className="group">
                  <CollapsibleTrigger className="flex items-center justify-between w-full cursor-pointer hover:bg-accent/5 rounded-md px-2 py-1.5 transition-colors">
                    <div className="font-bold text-foreground/90 text-md">
                      hints
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="mt-2 rounded-xl text-sm">
                    <div className="text-muted-foreground rounded-xl bg-accent/5 p-4 [&_code]:px-1 [&_code]:py-0 [&_code]:rounded-sm [&_code]:bg-muted/20 [&_code]:text-sm [&_code]:font-mono [&_p]:mb-2 [&_p:last-child]:mb-0 [&_pre]:bg-muted/10 [&_pre]:p-2 [&_pre]:rounded [&_pre]:overflow-x-auto [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {puzzle.hints}
                      </ReactMarkdown>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    );
  };

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
