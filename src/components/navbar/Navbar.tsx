"use client";

import Image from "next/image";
import { TimerIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item, ItemContent, ItemMedia } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import Timer from "@/components/navbar/Timer";
import StatusBar from "@/components/navbar/StatusBar";

interface NavbarProps {
  streak?: number;
  attemptsLeft?: number | null;
  maxAttempts?: number;
}

export default function Navbar({
  streak,
  attemptsLeft,
  maxAttempts,
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
          className="w-[32px] md:w-[38px] h-auto"
        />
      </div>
      <div className="flex-1 flex items-center justify-center h-full">
        <Item
          variant="default"
          className="px-4 sm:px-4 sm:py-1.5 md:px-4 py-1.5 md:py-1.5 gap-3 rounded-xl border border-border bg-card shadow-sm"
        >
          <ItemMedia className="hidden sm:block">
            <TimerIcon className="text-primary stroke-3" size={18} />
          </ItemMedia>
          <ItemContent className="flex flex-row justify-center items-center gap-1 sm:gap-3">
            <div className="h-5">
              <Separator
                className="hidden sm:block md:block"
                orientation="vertical"
                decorative
              />
            </div>
            <Timer />
          </ItemContent>
        </Item>
      </div>
      <div className="flex-1 flex gap-2 md:gap-4 justify-end items-center h-full">
        <StatusBar
          streak={streak ?? 5}
          attemptsLeft={attemptsLeft}
          maxAttempts={maxAttempts}
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
          <AvatarFallback>LY</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
