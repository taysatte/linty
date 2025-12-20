"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { PuzzleIcon } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PuzzlePageClientProps } from "@/components/puzzle/PuzzlePageClient";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PuzzleDescription } from "./PuzzleDescription";
import { PuzzleInstructions } from "./PuzzleInstructions";
import { PuzzleHints } from "./PuzzleHints";
import { PuzzleMetadata } from "./PuzzleMetadata";

const PuzzleDescClient = ({ puzzle }: PuzzlePageClientProps) => {
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false);
  const [isHintsOpen, setIsHintsOpen] = useState(false);

  const DesktopLayout = () => {
    const puzzleId = puzzle.id.toString().padStart(3, "0");

    return (
      <Card className="h-full w-full p-0 gap-0 flex flex-col">
        <CardHeader className="p-4 gap-0 rounded-t-xl m-0 shrink-0">
          <CardTitle className="flex flex-row items-start justify-between gap-2">
            <div className="flex items-center gap-3">
              <PuzzleIcon className="size-5 stroke-3 text-primary/80" />
              <h1 className="text-xl font-black text-foreground/80 flex-1">
                {puzzle.title}
              </h1>
            </div>
            <div className="text-lg font-semibold font-mono text-muted-foreground/90 shrink-0">
              #{puzzleId}
            </div>
          </CardTitle>
        </CardHeader>
        <ScrollArea
          scrollHideDelay={100}
          className="flex-1 min-h-0 w-full rounded-b-xl"
        >
          <CardContent className="flex flex-col p-4 pt-2 gap-4 h-full">
            <PuzzleMetadata
              difficulty={puzzle.difficulty}
              tags={puzzle.tags}
              variant="desktop"
            />
            <PuzzleDescription description={puzzle.description} />
            {puzzle.instructions && (
              <PuzzleInstructions instructions={puzzle.instructions} />
            )}
            {puzzle.hints && <PuzzleHints hints={puzzle.hints} />}
          </CardContent>
        </ScrollArea>
      </Card>
    );
  };

  const MobileLayout = () => {
    return (
      <Collapsible open={isPuzzleOpen} onOpenChange={setIsPuzzleOpen}>
        <Card className="p-0 gap-0 flex flex-col">
          <CardHeader className="p-4 gap-0 rounded-t-xl m-0 shrink-0">
            <CollapsibleTrigger className="cursor-pointer w-full flex items-center justify-between transition-all duration-100 rounded-md px-2 py-1 -my-1">
              <CardTitle className="flex flex-row flex-wrap items-center gap-2 justify-between w-full">
                <div className="text-xl font-black text-foreground/80">
                  {puzzle.title}
                </div>
                <div className="text-lg font-semibold font-mono text-muted-foreground/90 shrink-0">
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
            <CardContent className="flex flex-col p-4 pt-2 gap-4 rounded-b-xl">
              <PuzzleMetadata
                difficulty={puzzle.difficulty}
                tags={puzzle.tags}
                variant="mobile"
              />
              <PuzzleDescription description={puzzle.description} />
              {puzzle.instructions && (
                <PuzzleInstructions instructions={puzzle.instructions} />
              )}
              {puzzle.hints && (
                <PuzzleHints
                  hints={puzzle.hints}
                  isControlled={true}
                  isOpen={isHintsOpen}
                  onOpenChange={setIsHintsOpen}
                />
              )}
            </CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    );
  };

  return (
    <>
      <div className="hidden md:block h-full">
        <DesktopLayout />
      </div>
      <div className="md:hidden">
        <MobileLayout />
      </div>
    </>
  );
};

export default PuzzleDescClient;
