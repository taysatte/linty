import React from "react";
import { Button } from "@/components/animate-ui/components/buttons/button";
import { Spinner } from "@/components/ui/spinner";
import { CircleDotIcon, CheckCircle2Icon, XCircleIcon } from "lucide-react";
import { TestResult } from "@/components/puzzle/types";

interface PuzzleTestCaseProps {
  testCaseId: number;
  inputParams: string | null;
  expectedOutput: string;
  isLoading: boolean;
  isRunning?: boolean; // Individual test loading state
  testResult?: TestResult | null;
  onRunTestCase?: () => void;
}

const PuzzleTestCase = ({
  testCaseId,
  inputParams,
  expectedOutput,
  isLoading,
  isRunning = false,
  testResult = null,
  onRunTestCase,
}: PuzzleTestCaseProps) => {
  const getStatusIcon = () => {
    if (isRunning) {
      return (
        <Spinner className="size-6 text-muted-foreground/80 animate-spin shrink-0" />
      );
    }
    if (testResult) {
      if (testResult.passed) {
        return (
          <CheckCircle2Icon className="size-6 text-easy-puzzle shrink-0" />
        );
      } else {
        return <XCircleIcon className="size-6 text-hard-puzzle shrink-0" />;
      }
    }
    return (
      <CircleDotIcon className="size-6 text-muted-foreground/80 shrink-0" />
    );
  };

  const getStatusColor = () => {
    if (testResult) {
      if (testResult.passed) {
        return "border-easy-puzzle/30 bg-easy-puzzle/5";
      } else {
        return "border-hard-puzzle/30 bg-hard-puzzle/5";
      }
    }
    return "";
  };

  return (
    <>
      <Button
        variant="outline"
        hoverScale={1.02}
        tapScale={0.99}
        className={`cursor-pointer w-full rounded-lg h-auto p-3 justify-start items-center gap-3 ${getStatusColor()}`}
        onClick={onRunTestCase}
        disabled={isLoading || isRunning}
      >
        {getStatusIcon()}
        <div className="flex flex-col items-start gap-2 flex-1 min-w-0">
          <div className="text-sm font-mono font-medium text-foreground/90 w-full text-left">
            Input:{" "}
            <code className="bg-muted-foreground/10 break-all text-left">
              {inputParams}
            </code>
          </div>
          <div className="text-sm font-mono font-medium text-foreground/90 w-full text-left">
            Expected:{" "}
            <code className="bg-muted-foreground/10 break-all text-left">
              {expectedOutput}
            </code>
          </div>
          {testResult && (
            <>
              <div className="text-sm font-mono font-medium text-foreground/90 w-full text-left">
                Got:{" "}
                <code
                  className={`break-all text-left ${
                    testResult.passed
                      ? "bg-easy-puzzle/10 text-easy-puzzle dark:text-easy-puzzle"
                      : "bg-hard-puzzle/10 text-hard-puzzle dark:text-hard-puzzle"
                  }`}
                >
                  {testResult.output || "(no output)"}
                </code>
              </div>
              {testResult.error && (
                <div className="text-sm font-mono font-medium text-hard-puzzle dark:text-hard-puzzle w-full text-left">
                  Error:{" "}
                  <code className="bg-hard-puzzle/10 break-all text-left">
                    {testResult.error}
                  </code>
                </div>
              )}
            </>
          )}
        </div>
      </Button>
    </>
  );
};

export default PuzzleTestCase;
