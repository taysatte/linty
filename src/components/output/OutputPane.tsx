"use client";

import { useState } from "react";
import { Card } from "../ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDown, ChevronUp, TerminalSquareIcon } from "lucide-react";
import Output from "./Output";
import { OutputProps } from "./types";

interface OutputPaneProps extends OutputProps {
  variant?: "desktop" | "mobile";
  onToggleCollapse?: () => void;
  isCollapsed?: boolean;
}

const OutputPane = ({
  variant = "desktop",
  onToggleCollapse,
  isCollapsed = false,
  ...outputProps
}: OutputPaneProps) => {
  const [isOpen, setIsOpen] = useState(true);

  if (variant === "mobile") {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <Card className="p-0">
          <CollapsibleTrigger className="w-full p-3 flex items-center justify-between">
            <p className="text-md font-black text-foreground/80">Output</p>
            {isOpen ? (
              <ChevronUp className="text-muted-foreground/80 h-4 w-4" />
            ) : (
              <ChevronDown className="text-muted-foreground/80 h-4 w-4" />
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="px-3 pb-3 max-h-[200px] overflow-auto">
              <Output {...outputProps} />
            </div>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    );
  }

  return (
    <Card className="h-full w-full p-0 flex flex-col">
      <button
        onClick={onToggleCollapse}
        className={`w-full p-4 flex items-center justify-between shrink-0 hover:bg-muted/50 transition-colors cursor-pointer rounded-t-xl ${
          isCollapsed ? "rounded-b-xl" : "border-b"
        }`}
      >
        <p className="text-lg flex items-center gap-3 font-black text-foreground/80">
          <span>
            <TerminalSquareIcon className="size-4.5 stroke-3 text-primary shrink-0" />
          </span>
          Output
        </p>
        {isCollapsed ? (
          <ChevronDown className="text-muted-foreground/80 h-4 w-4" />
        ) : (
          <ChevronUp className="text-muted-foreground/80 h-4 w-4" />
        )}
      </button>
      {!isCollapsed && (
        <div className="flex-1 min-h-0">
          <Output {...outputProps} />
        </div>
      )}
    </Card>
  );
};

export default OutputPane;
