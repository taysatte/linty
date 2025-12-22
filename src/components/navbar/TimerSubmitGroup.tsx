"use client";

import { useState } from "react";
import { TimerIcon, SendIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@/components/ui/button-group";
import { cn } from "@/lib/utils";
import Timer from "./Timer";
import { Send } from "@/components/animate-ui/icons/send";
import { AnimateIcon } from "@/components/animate-ui/icons/icon";

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
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const isOutOfAttempts =
    typeof attemptsLeft === "number" && attemptsLeft === 0;

  const handleClick = () => {
    setShouldAnimate(true);
    onSubmit?.();
    // Reset animation state after a delay to allow it to complete
    setTimeout(() => {
      setShouldAnimate(false);
    }, 1000);
  };

  return (
    <ButtonGroup
      orientation="horizontal"
      className=" rounded-lg flex items-center border border-border bg-card"
    >
      {/* Timer Section */}
      <ButtonGroupText className="gap-2.5 flex items-center bg-transparent px-3 sm:px-4 border-0 p-1.5">
        <TimerIcon
          className="text-primary stroke-3 hidden sm:block"
          size={16}
        />
        <Timer />
      </ButtonGroupText>
      {onSubmit && (
        <>
          <ButtonGroupSeparator
            orientation="vertical"
            className="h-full bg-border"
          />
          <Button
            size="lg"
            onClick={handleClick}
            disabled={disabled || isLoading || isOutOfAttempts}
            variant="ghost"
            className={cn(
              "cursor-pointer p-4 rounded-lg",
              isOutOfAttempts && "opacity-50 cursor-not-allowed"
            )}
          >
            <AnimateIcon animate={shouldAnimate} persistOnAnimateEnd>
              <div className="flex items-center justify-center">
                <Send className="size-4 stroke-3 text-primary/90" />
              </div>
            </AnimateIcon>
          </Button>
        </>
      )}
    </ButtonGroup>
  );
}
