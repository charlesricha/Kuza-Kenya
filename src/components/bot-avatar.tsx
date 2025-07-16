"use client"

import { Bot } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function BotAvatar() {
  return (
    <Avatar className="h-10 w-10">
      <AvatarFallback className="bg-primary text-primary-foreground">
        <Bot className="h-6 w-6" />
      </AvatarFallback>
    </Avatar>
  );
}
