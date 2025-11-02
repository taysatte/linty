"use client";

import { FlameIcon } from "lucide-react";

interface StreakProps {
  streak: number;
}

export default function Streak({ streak }: StreakProps) {
  return (
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-border bg-card shadow-sm">
      <FlameIcon
        className="text-destructive stroke-3 fill-destructive"
        size={16}
      />
      <span className="text-sm font-semibold font-mono text-foreground">
        {streak}
      </span>
    </div>
  );
}
