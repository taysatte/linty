import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

interface PuzzleHintsProps {
  hints: string;
  isControlled?: boolean;
  isOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function PuzzleHints({
  hints,
  isControlled = false,
  isOpen: controlledIsOpen,
  onOpenChange,
}: PuzzleHintsProps) {
  const [internalIsOpen, setInternalIsOpen] = useState(false);
  const isOpen = isControlled ? controlledIsOpen : internalIsOpen;
  const handleOpenChange = isControlled ? onOpenChange : setInternalIsOpen;

  return (
    <>
      <Collapsible
        open={isOpen}
        onOpenChange={handleOpenChange}
        className="group"
      >
        <CollapsibleTrigger className="flex items-center justify-between w-full cursor-pointer hover:bg-muted/50 rounded-md px-2 py-1.5 transition-colors">
          <h2 className="font-bold text-md text-foreground/90">Hints</h2>
          <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-180" />
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 rounded-xl text-sm">
          <div className="text-muted-foreground rounded-xl border border-muted/50 shadow-sm bg-muted p-4 [&_code]:px-1 [&_code]:py-0 [&_code]:rounded-sm [&_code]:bg-muted-foreground/10 [&_code]:text-sm [&_code]:font-mono [&_p]:mb-2 [&_p:last-child]:mb-0 [&_pre]:bg-muted-foreground/10 [&_pre]:p-2 [&_pre]:rounded-xs [&_pre]:overflow-x-auto [&_ul]:list-disc [&_ul]:ml-4 [&_ol]:list-decimal [&_ol]:ml-4 [&_li]:mb-1">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{hints}</ReactMarkdown>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );
}
