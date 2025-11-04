"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PuzzlePageClientProps } from "./PuzzlePageClient";
import { Item, ItemContent } from "../ui/item";

const PuzzleDescClient = ({ puzzle }: PuzzlePageClientProps) => {
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false);

  const getDifficultyColor = (difficulty: string | null) => {
    const normalizedDifficulty = (difficulty || "easy").toLowerCase();
    if (normalizedDifficulty === "easy") {
      return "text-[var(--easy-puzzle)]";
    } else if (
      normalizedDifficulty === "medium" ||
      normalizedDifficulty === "intermediate"
    ) {
      return "text-[var(--medium-puzzle)]";
    } else if (
      normalizedDifficulty === "hard" ||
      normalizedDifficulty === "expert"
    ) {
      return "text-[var(--hard-puzzle)]";
    }
    return "text-muted-foreground";
  };

  const DesktopVersion = () => {
    const difficulty = puzzle.difficulty || "Easy";
    const difficultyColor = getDifficultyColor(puzzle.difficulty);

    return (
      <Card className="shadow-lg h-full w-full p-0 gap-0">
        <CardHeader className="p-4 gap-0 rounded-t-xl m-0">
          <CardTitle className="font-black text-primary">
            <div className="flex items-center justify-between">
              <div className="text-2xl bg-primary/5 px-3 py-1.5 rounded-lg font-black text-primary">
                {puzzle.title.toLowerCase().replaceAll(" ", "-")}
              </div>
              <Item
                variant="default"
                className="bg-muted/15 py-1 px-3 rounded-lgj"
              >
                <ItemContent
                  className={`text-lg font-semibold ${difficultyColor}`}
                >
                  {difficulty}
                </ItemContent>
              </Item>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 bg-background/70 h-full rounded-b-xl border-t border-border">
          <div className="text-sm text-muted-foreground whitespace-pre-wrap">
            {puzzle.description}
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
          <p className="text-lg font-bold text-primary">{puzzle.title}</p>
          {isPuzzleOpen ? (
            <ChevronUp className="text-primary/60 h-4 w-4" />
          ) : (
            <ChevronDown className="text-primary/60 h-4 w-4" />
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="px-3 pb-3">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">
              {puzzle.description}
            </p>
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
