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
        "cursor-pointer font-semibold shadow-sm",
        "bg-chart-2/30 text-foreground hover:bg-chart-2/40",
        "border-2 border-chart-2/20",
        // Disabled state when out of attempts
        isOutOfAttempts && "opacity-50 cursor-not-allowed"
      )}
    >
      <SendIcon className="size-4 stroke-3 text-chart-1/80" />
      <span>Submit</span>
    </Button>
  );
};
