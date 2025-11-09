import { SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        "cursor-pointer border-border rounded-xl border font-semibold bg-card hover:bg-card/90 text-foreground/90 shadow-sm",
        // Disabled state when out of attempts
        isOutOfAttempts && "opacity-50 cursor-not-allowed"
      )}
    >
      <SendIcon className="size-4 stroke-3 text-primary/90" />
      <span className="hidden sm:hidden md:inline">Submit</span>
    </Button>
  );
};
