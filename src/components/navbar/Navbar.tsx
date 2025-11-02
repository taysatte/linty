"use client";

import Image from "next/image";
import { TimerIcon, FlameIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Item, ItemContent, ItemMedia } from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import Timer from "@/components/navbar/Timer";

export default function Navbar() {
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
          className="px-4 sm:px-4 sm:py-1.5 md:px-4 py-1.5 md:py-1.5 gap-3 rounded-2xl border border-border bg-card shadow-sm"
        >
          <ItemMedia className="hidden sm:block">
            <TimerIcon className="text-primary stroke-3" size={18} />
          </ItemMedia>
          <ItemContent className="flex flex-row justify-center items-center gap-3">
            <div className="h-5">
              <Separator orientation="vertical" decorative />
            </div>
            <Timer />
          </ItemContent>
        </Item>
      </div>
      <div className="flex-1 flex gap-2 md:gap-4 justify-end items-center h-full">
        <div className="flex flex-1 gap-2 justify-end items-center h-full"></div>
        {/* TODO: Implement user settings */}
        <div className="h-6 hidden sm:block">
          <Separator orientation="vertical" decorative />
        </div>
        <Avatar className="sm:ml-2 w-8 h-8 md:w-10 md:h-10">
          <AvatarImage src="https://avatar.iran.liara.run/public" />
          <AvatarFallback>LY</AvatarFallback>
        </Avatar>
      </div>
    </nav>
  );
}
