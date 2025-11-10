import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export interface SubmitButtonProps {
  onSubmit: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  attemptsLeft?: number | null;
  maxAttempts?: number;
}

export const SubmitButton = ({
  onSubmit,
  disabled = false,
  isLoading = false,
  attemptsLeft = null,
  maxAttempts = 3,
}: SubmitButtonProps) => {
  // Check if out of attempts - we still need this for disabling the button
  const isOutOfAttempts =
    typeof attemptsLeft === "number" && attemptsLeft === 0;

  return (
    <Button
      size="lg"
      onClick={onSubmit}
      disabled={disabled || isLoading || isOutOfAttempts}
      variant="default"
      className={cn(
        "cursor-pointer border-border rounded-xl border font-semibold bg-card hover:bg-border/70 text-foreground/90 shadow-sm gap-2",
        // Disabled state when out of attempts
        isOutOfAttempts && "opacity-50 cursor-not-allowed"
      )}
    >
      <SendIcon className="size-4 stroke-3 text-primary/90" />
      <span className="hidden sm:hidden md:inline pr-1">Submit</span>
      {typeof attemptsLeft === "number" && (
        <div className="flex items-center h-full justify-center gap-4">
          <Separator orientation="vertical" className="h-3" decorative />
          <span className="hidden sm:hidden md:inline text-[.9rem] text-foreground/70 font-semibold font-mono">
            {attemptsLeft}
          </span>
        </div>
      )}
    </Button>
  );
};
