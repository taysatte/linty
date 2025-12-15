import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Separator } from "@/components/ui/separator";

interface PuzzleInstructionsProps {
  instructions: string;
}

export function PuzzleInstructions({ instructions }: PuzzleInstructionsProps) {
  return (
    <>
      <div className="w-full">
        <Separator decorative orientation="horizontal" />
      </div>
      <h2 className="font-bold text-md text-foreground/90">Instructions</h2>
      <div className="p-3 text-sm text-foreground/80 rounded-lg bg-secondary/50 border border-secondary [&_code]:px-1 [&_code]:py-0.5 [&_code]:rounded-sm [&_code]:bg-muted/30 [&_code]:text-sm [&_code]:font-mono [&_p]:mb-1.5 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {instructions}
        </ReactMarkdown>
      </div>
    </>
  );
}
