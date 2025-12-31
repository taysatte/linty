import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import { FlaskConicalIcon } from "lucide-react";
import { TestCase } from "../../generated/prisma/client";
import PuzzleTestCase from "./PuzzleTestCase";
import { type Language } from "@/lib/languageVersions";
import { TestResult } from "@/components/puzzle/types";

interface PuzzleTestCasesProps {
  testCases: TestCase[];
  isLoading: boolean;
  code: string;
  language: Language;
  puzzleId: number;
}

const PuzzleTestCases = ({
  testCases,
  isLoading,
  code,
  language,
  puzzleId,
}: PuzzleTestCasesProps) => {
  const [runningTestIds, setRunningTestIds] = useState<Set<number>>(new Set());
  const [testResults, setTestResults] = useState<
    Map<number, TestResult | null>
  >(new Map());

  const handleRunTestCase = async (testCaseId: number) => {
    setRunningTestIds((prev) => new Set(prev).add(testCaseId));

    try {
      const response = await fetch("/api/execute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language, puzzleId, testCaseId }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to execute test case");
      }

      const data = await response.json();
      if (data.testResults && data.testResults.length > 0) {
        const result = data.testResults[0];
        setTestResults((prev) => {
          const newMap = new Map(prev);
          newMap.set(testCaseId, result);
          return newMap;
        });
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Test execution failed";
      setTestResults((prev) => {
        const newMap = new Map(prev);
        newMap.set(testCaseId, {
          testCaseId,
          passed: false,
          output: "",
          expectedOutput: "",
          error: errorMessage,
          exitCode: -1,
        });
        return newMap;
      });
    } finally {
      setRunningTestIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(testCaseId);
        return newSet;
      });
    }
  };

  return (
    <>
      <Card className="h-full w-full p-0 gap-0 flex flex-col">
        <CardHeader className="p-4 gap-0 rounded-t-xl m-0 shrink-0">
          <CardTitle className="flex flex-row items-start justify-between gap-2">
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <FlaskConicalIcon className="size-4.5 stroke-3 text-primary/80" />
              <h2 className="text-xl font-black text-foreground/80">
                Test Cases
              </h2>
            </div>
          </CardTitle>
        </CardHeader>
        <ScrollArea
          scrollHideDelay={100}
          className="flex-1 min-h-0 w-full rounded-b-xl"
        >
          <CardContent className="p-4 pt-2 h-full overflow-hidden">
            <div className="flex flex-col gap-4">
              {testCases.map((testCase) => (
                <PuzzleTestCase
                  key={testCase.id}
                  testCaseId={testCase.id}
                  inputParams={testCase.inputParams ?? ""}
                  expectedOutput={testCase.expectedOutput ?? ""}
                  isLoading={isLoading}
                  isRunning={runningTestIds.has(testCase.id)}
                  testResult={testResults.get(testCase.id) || null}
                  onRunTestCase={() => handleRunTestCase(testCase.id)}
                />
              ))}
            </div>
          </CardContent>
        </ScrollArea>
      </Card>
    </>
  );
};

export default PuzzleTestCases;
