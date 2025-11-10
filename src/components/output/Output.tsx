import { Card } from "../ui/card";
import { OutputProps } from "./types";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { TerminalIcon } from "lucide-react";

const Output = ({ output, isLoading, testsPassed }: OutputProps) => {
  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }
  return (
    <>
      <TerminalIcon className="size-4 text-muted-foreground" />
      <div className="w-full">
        <Separator decorative orientation="horizontal" />
      </div>
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
