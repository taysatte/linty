"use client";

import { FlameIcon, TargetIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface StatusBarProps {
  streak?: number;
  attemptsLeft?: number | null;
  maxAttempts?: number;
}

export default function StatusBar({
  streak,
  attemptsLeft,
  maxAttempts = 3,
}: StatusBarProps) {
  // Ensure attemptsLeft is defined and a number for checks
  const hasAttempts = typeof attemptsLeft === "number" && attemptsLeft > 0;
  const isOutOfAttempts =
    typeof attemptsLeft === "number" && attemptsLeft === 0;

  return (
    <div className="flex items-center gap-2">
      {/* Streak Counter */}
      {streak !== undefined && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card shadow-sm">
          <FlameIcon
            className="text-destructive stroke-3 fill-destructive"
            size={16}
          />
          <span className="text-sm font-semibold font-mono text-foreground">
            {streak}
          </span>
        </div>
      )}

      {/* Attempts Counter - Only show when attemptsLeft is provided */}
      {attemptsLeft !== null && (
        <>
          {streak !== undefined && (
            <Separator orientation="vertical" className="h-6" decorative />
          )}
          <div
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-xl border shadow-sm",
              "bg-card",
              // Warning state when low on attempts
              attemptsLeft === 1 && "border-destructive/50 bg-destructive/5",
              // Out of attempts state
              isOutOfAttempts && "opacity-50 border-muted bg-muted/50"
            )}
            aria-label={`${attemptsLeft} submission attempt${
              attemptsLeft !== 1 ? "s" : ""
            } remaining`}
          >
            <TargetIcon
              className={cn(
                "stroke-3",
                attemptsLeft === 1 && "text-destructive",
                isOutOfAttempts && "text-muted-foreground",
                !isOutOfAttempts && attemptsLeft !== 1 && "text-primary"
              )}
              size={16}
            />
            <span
              className={cn(
                "text-sm font-semibold font-mono",
                attemptsLeft === 1 && "text-destructive",
                isOutOfAttempts && "text-muted-foreground",
                !isOutOfAttempts && attemptsLeft !== 1 && "text-foreground"
              )}
            >
              {attemptsLeft}/{maxAttempts}
            </span>
          </div>
        </>
      )}
    </div>
  );
}
