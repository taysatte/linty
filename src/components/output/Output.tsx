import { Card } from "../ui/card";
import { OutputProps } from "./types";
import { Separator } from "../ui/separator";

const Output = ({ output, isLoading, testsPassed }: OutputProps) => {
  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }
  return (
    <>
      <div className="text-sm font-medium text-primary">{"linty@sh ~>"}</div>
      <div className="w-full bg-border">
        <Separator decorative orientation="horizontal" />
      </div>
      <div className="flex flex-col gap-2">
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </div>
    </>
  );
};

export default Output;
