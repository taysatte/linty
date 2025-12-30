import { OutputProps } from "./types";
import { ScrollArea } from "../ui/scroll-area";
import { Spinner } from "../ui/spinner";

const Output = ({ output, isLoading, testsPassed }: OutputProps) => {
  return (
    <div className="font-mono h-full w-full gap-4 p-4 pt-2 flex flex-col">
      <ScrollArea className="flex-1 min-h-0 w-full rounded-b-xl">
        {isLoading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Spinner className="size-4 animate-spin" />
            <span>Running...</span>
          </div>
        ) : output.length === 0 ? (
          <div className="text-md text-muted-foreground">
            No output yet. Run your code to see results.
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            {output.map((line, index) => (
              <div key={index}>{line}</div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default Output;
