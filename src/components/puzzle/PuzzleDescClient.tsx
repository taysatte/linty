"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { PuzzlePageClientProps } from "./PuzzlePageClient";

const PuzzleDescClient = ({ puzzle }: PuzzlePageClientProps) => {
  const [isPuzzleOpen, setIsPuzzleOpen] = useState(false);

  const DesktopVersion = () => (
    <Card className="shadow-lg h-full w-full p-4">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold">{puzzle.title}</h2>
          <p className="text-sm text-muted-foreground mt-1">
            {puzzle.difficulty && (
              <span className="capitalize">{puzzle.difficulty}</span>
            )}
          </p>
        </div>
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
      </div>
    </Card>
  );

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
