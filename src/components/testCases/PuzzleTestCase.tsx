import React from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Spinner } from "@/components/ui/spinner";
import { CircleDotIcon } from "lucide-react";

interface PuzzleTestCaseProps {
  inputParams: string | null;
  expectedOutput: string;
  isLoading: boolean;
}

const PuzzleTestCase = ({
  inputParams,
  expectedOutput,
  isLoading,
}: PuzzleTestCaseProps) => {
  return (
    <>
      <Button
        variant="outline"
        hoverScale={1.02}
        tapScale={0.98}
        className="cursor-pointer w-full h-auto p-3 justify-start items-center gap-3"
      >
        {isLoading ? (
          <Spinner className="size-6 text-muted-foreground/80 animate-spin shrink-0" />
        ) : (
          <CircleDotIcon className="size-6 text-muted-foreground/80 shrink-0" />
        )}
        <div className="flex flex-col items-start gap-2 flex-1 min-w-0">
          <div className="text-sm font-mono font-medium text-foreground/90 w-full text-left">
            Input:{" "}
            <code className="bg-muted-foreground/10 break-all text-left">
              {inputParams}
            </code>
          </div>
          <div className="text-sm font-mono font-medium text-foreground/90 w-full text-left">
            Output:{" "}
            <code className="bg-muted-foreground/10 break-all text-left">
              {expectedOutput}
            </code>
          </div>
        </div>
      </Button>
    </>
  );
};

export default PuzzleTestCase;
