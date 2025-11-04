import { Card } from "../ui/card";
import { OutputProps } from "./types";

const Output = ({ output, isLoading, testsPassed }: OutputProps) => {
  if (isLoading) {
    return <div className="text-sm text-muted-foreground">Loading...</div>;
  }
  return (
    <>
      <Card className="shadow-lg font-mono h-full w-full p-4 pt-3">
        <div className="text-sm font-medium text-muted-foreground">
          {"linty@sh ~>"}
        </div>
        {output.map((line, index) => (
          <div key={index}>{line}</div>
        ))}
      </Card>
    </>
  );
};

export default Output;
