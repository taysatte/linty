"use client";

import { TimerIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { cn } from "@/lib/utils";
import Timer from "./Timer";

interface TimerSubmitGroupProps {
  onSubmit?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  attemptsLeft?: number | null;
  maxAttempts?: number;
}

export default function TimerSubmitGroup({
  onSubmit,
  disabled = false,
  isLoading = false,
  attemptsLeft = null,
  maxAttempts = 3,
}: TimerSubmitGroupProps) {
  const isOutOfAttempts =
    typeof attemptsLeft === "number" && attemptsLeft === 0;

  return (
    <ButtonGroup
      orientation="horizontal"
      className=" rounded-xl flex items-center border border-border bg-card shadow-sm"
    >
      {/* Timer Section */}
      <ButtonGroupText className="gap-2.5 flex items-center bg-transparent px-3 sm:px-4 border-0 p-1.5">
        <TimerIcon
          className="text-primary stroke-3 hidden sm:block"
          size={16}
        />
        <Timer />
      </ButtonGroupText>
      <ButtonGroupSeparator
        orientation="vertical"
        className="h-full bg-border"
      />
      {onSubmit && (
        <>
          <Button
            size="lg"
            onClick={onSubmit}
            disabled={disabled || isLoading || isOutOfAttempts}
            variant="ghost"
            className={cn(
              "cursor-pointer p-0 rounded-lg",
              isOutOfAttempts && "opacity-50 cursor-not-allowed"
            )}
          >
            <SendIcon className="size-4 stroke-3 text-primary/90" />
            <span className="hidden sm:hidden md:inline pr-1">Submit</span>
          </Button>
        </>
      )}
    </ButtonGroup>
  );
}
