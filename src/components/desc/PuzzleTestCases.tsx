import { TestCase } from "@/generated/prisma";

interface PuzzleTestCasesProps {
  testCases: TestCase[];
}

export function PuzzleTestCases({ testCases }: PuzzleTestCasesProps) {
  if (!testCases || testCases.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="font-bold text-md text-foreground/90">Test Cases</h2>
      <div className="p-4 space-y-4 rounded-lg bg-muted/50 border border-muted">
        {testCases.map((testCase) => (
          <div key={testCase.id}>
            <div className="text-sm space-y-1.5">
              <div>
                <span className="font-medium text-foreground/90">Input:</span>{" "}
                <code className="px-1 py-0.5 rounded-sm font-normal bg-muted text-sm">
                  {testCase.inputParams}
                </code>
              </div>
              <div>
                <span className="font-medium text-foreground/90">
                  Expected:
                </span>{" "}
                <code className="px-1 py-0.5 rounded-sm font-normal bg-muted text-sm">
                  {testCase.expectedOutput}
                </code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
