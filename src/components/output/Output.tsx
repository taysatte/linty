import { OutputProps } from "./types";
import { ScrollArea } from "../ui/scroll-area";
import { TerminalIcon } from "lucide-react";

const Output = ({ output, isLoading, testsPassed }: OutputProps) => {
  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }
  return (
    <>
      <TerminalIcon className="size-5 stroke-3 text-primary/80" />
      <ScrollArea className="flex-1 min-h-0 w-full rounded-b-xl">
        <div className="flex flex-col gap-1">
          {output.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
      </ScrollArea>
    </>
  );
};

export default Output;
