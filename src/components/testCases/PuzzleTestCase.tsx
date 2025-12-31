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
        return <CheckCircle2Icon className="size-6 text-green-500 shrink-0" />;
      } else {
        return <XCircleIcon className="size-6 text-red-500 shrink-0" />;
      }
    }
    return (
      <CircleDotIcon className="size-6 text-muted-foreground/80 shrink-0" />
    );
  };

  const getStatusColor = () => {
    if (testResult) {
      if (testResult.passed) {
        return "border-green-500/30 bg-green-500/5";
      } else {
        return "border-red-500/30 bg-red-500/5";
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
                      ? "bg-green-500/10 text-green-600 dark:text-green-400"
                      : "bg-red-500/10 text-red-600 dark:text-red-400"
                  }`}
                >
                  {testResult.output || "(no output)"}
                </code>
              </div>
              {testResult.error && (
                <div className="text-sm font-mono font-medium text-red-600 dark:text-red-400 w-full text-left">
                  Error:{" "}
                  <code className="bg-red-500/10 break-all text-left">
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
