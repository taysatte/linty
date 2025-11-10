"use client";

import { useEffect, useState } from "react";

/**
 * Timer component that counts down to the next puzzle reset (midnight UTC)
 */
export default function Timer() {
  const [timeLeft, setTimeLeft] = useState<string>("00:00:00");

  useEffect(() => {
    // Calculate time until next midnight UTC
    const getTimeUntilMidnightUTC = () => {
      const now = new Date();
      const midnightUTC = new Date(
        Date.UTC(
          now.getUTCFullYear(),
          now.getUTCMonth(),
          now.getUTCDate() + 1, // Next day
          0,
          0,
          0,
          0
        )
      );

      return midnightUTC.getTime() - now.getTime();
    };

    // Format time as HH:MM:SS
    const formatTime = (ms: number) => {
      const totalSeconds = Math.floor(ms / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;

      return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
        2,
        "0"
      )}:${String(seconds).padStart(2, "0")}`;
    };

    // Update immediately
    const updateTimer = () => {
      const msUntilMidnight = getTimeUntilMidnightUTC();
      setTimeLeft(formatTime(msUntilMidnight));
    };

    updateTimer();

    // Update every second
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-lg text-foreground/80 font-semibold font-mono">
      {timeLeft}
    </span>
  );
}
