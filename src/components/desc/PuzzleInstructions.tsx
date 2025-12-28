import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PuzzleInstructionsProps {
  instructions: string;
}

export function PuzzleInstructions({ instructions }: PuzzleInstructionsProps) {
  return (
    <>
      <h2 className="font-bold text-md text-foreground/90">Instructions</h2>
      <div className="p-3 text-sm text-foreground/80 rounded-lg bg-primary/5 border border-primary/10 [&_code]:bg-primary/12 [&_p]:mb-1.5 [&_p:last-child]:mb-0 [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {instructions}
        </ReactMarkdown>
      </div>
    </>
  );
}
