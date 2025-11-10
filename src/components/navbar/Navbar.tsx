"use client";

import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import StatusBar from "@/components/navbar/StatusBar";
import TimerSubmitGroup from "@/components/navbar/TimerSubmitGroup";
import { TEST_STREAK_LENGTH } from "./constants";
import { MAX_ATTEMPTS } from "../puzzle/constants";

interface NavbarProps {
  streak?: number;
  attemptsLeft?: number | null;
  maxAttempts?: number;
  onSubmit?: () => void;
  isLoading?: boolean;
}

export default function Navbar({
  streak,
  attemptsLeft,
  maxAttempts,
  onSubmit,
  isLoading = false,
}: NavbarProps = {}) {
  return (
    <nav className="px-2 md:px-4 md:pt-2 flex flex-row items-center h-[64px] w-full">
      <div className="flex-1 flex justify-start h-full">
        <Image
          src="/svgs/linty-logo.svg"
          fetchPriority="high"
          priority
          loading="eager"
          alt="Linty Logo"
          width={0}
          height={0}
          className="w-[32px] md:w-[36px] h-auto"
        />
      </div>
      <div className="flex-1 flex items-center justify-center h-full">
        <TimerSubmitGroup
          onSubmit={onSubmit}
          isLoading={isLoading}
          attemptsLeft={attemptsLeft}
          maxAttempts={maxAttempts}
        />
      </div>
      <div className="flex-1 flex gap-2 md:gap-4 justify-end items-center h-full">
        <StatusBar
          streak={streak ?? TEST_STREAK_LENGTH}
          attemptsLeft={attemptsLeft}
          maxAttempts={maxAttempts ?? MAX_ATTEMPTS}
        />
        {/* TODO: Implement user settings */}
        <div className="h-6 hidden sm:block">
          <Separator
            className="hidden sm:hidden md:block"
            orientation="vertical"
            decorative
          />
        </div>
        <Avatar className="ml-0 w-8 h-8">
          <AvatarImage src="https://avatar.iran.liara.run/public" />
          <AvatarFallback className="font-mono bg-muted/20">LY</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
