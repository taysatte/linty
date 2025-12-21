import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface PuzzleDescriptionProps {
  description: string;
}

export function PuzzleDescription({ description }: PuzzleDescriptionProps) {
  return (
    <>
      <h2 className="font-bold text-md text-foreground/90">Description</h2>
      <div className="text-sm shadow-sm text-foreground/80 rounded-lg bg-muted border border-muted/50 p-4 [&_code]:px-1 [&_code]:py-0 [&_code]:rounded-sm [&_code]:bg-muted-foreground/10 [&_code]:text-sm [&_code]:font-mono [&_p]:mb-2 [&_p:last-child]:mb-0 [&_pre]:bg-muted-foreground/10 [&_pre]:p-2 [&_pre]:rounded-xs [&_pre]:overflow-x-auto [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
      </div>
    </>
  );
}
