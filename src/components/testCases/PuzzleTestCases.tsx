import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { FlaskConicalIcon } from "lucide-react";
import { TestCase } from "../../generated/prisma/client";
import PuzzleTestCase from "./PuzzleTestCase";

interface PuzzleTestCasesProps {
  testCases: TestCase[];
  isLoading: boolean;
}

const PuzzleTestCases = ({ testCases, isLoading }: PuzzleTestCasesProps) => {
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
        <CardContent className="flex flex-col p-4 pt-2 gap-4 h-full">
          {testCases.map((testCase) => (
            <PuzzleTestCase
              key={testCase.id}
              inputParams={testCase.inputParams ?? ""}
              expectedOutput={testCase.expectedOutput ?? ""}
              isLoading={isLoading}
            />
          ))}
        </CardContent>
      </Card>
    </>
  );
};

export default PuzzleTestCases;
