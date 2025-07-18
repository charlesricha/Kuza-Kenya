"use client";

import { useState, useEffect, useRef } from "react";
import { Send, Lightbulb, User, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { getAnswer, getTip } from "@/app/actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BotAvatar } from "@/components/bot-avatar";


type Message = {
  id: string;
  role: "user" | "bot" | "tip";
  content: string;
};

const UserAvatar = () => (
  <Avatar className="h-10 w-10">
    <AvatarFallback className="bg-secondary text-secondary-foreground">
      <User className="h-6 w-6" />
    </AvatarFallback>
  </Avatar>
);

const TipAvatar = () => (
    <Avatar className="h-10 w-10">
      <AvatarFallback className="bg-accent text-accent-foreground">
        <Lightbulb className="h-6 w-6" />
      </AvatarFallback>
    </Avatar>
  );

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchInitialMessages = async () => {
      const { tip } = await getTip("initial");
      setMessages([
        {
          id: `bot-intro-${Date.now()}`,
          role: "bot",
          content: "Hello! I'm Kiboko, your assistant for KuzaKenya. How can I help you today? You can ask me things like 'What is Kuza Kenya?' or 'How do I report an issue?'"
        },
        {
          id: `tip-${Date.now()}`,
          role: "tip",
          content: `Quick Tip: ${tip}`,
        },
      ]);
      setIsLoading(false);
    };
    fetchInitialMessages();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: inputValue,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    const { answer, error } = await getAnswer(userMessage.content);

    if (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error,
      });
      const errorMessage: Message = {
        id: `error-${Date.now()}`,
        role: "bot",
        content: "I'm sorry, I had an issue responding. Please try again.",
      }
      setMessages(prev => [...prev, errorMessage]);
    } else if (answer) {
      const botMessage: Message = {
        id: `bot-${Date.now()}`,
        role: "bot",
        content: answer,
      };
      setMessages((prev) => [...prev, botMessage]);
    }
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-2xl rounded-2xl overflow-hidden border-0">
      <CardHeader className="text-center bg-card">
        <CardTitle className="font-headline text-3xl text-primary">Kiboko Kuza</CardTitle>
        <CardDescription>Your friendly assistant for community issues</CardDescription>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[60vh]">
            <div className="p-6 flex flex-col gap-4">
                {messages.map((message) => (
                    <div
                        key={message.id}
                        className={cn(
                            "flex items-start gap-3 w-full",
                            message.role === "user" && "justify-end"
                        )}
                    >
                        {message.role !== "user" && (
                            message.role === 'bot' ? <BotAvatar /> : <TipAvatar />
                        )}
                        <div
                            className={cn(
                                "max-w-[80%] rounded-2xl p-3 px-4",
                                message.role === "user"
                                ? "bg-primary text-primary-foreground rounded-br-none"
                                : "bg-secondary text-secondary-foreground rounded-bl-none",
                                message.role === "tip" && "bg-accent/30 border border-accent rounded-bl-none"
                            )}
                        >
                            <p className="text-sm" dangerouslySetInnerHTML={{ __html: message.content }} />
                        </div>
                        {message.role === "user" && <UserAvatar />}
                    </div>
                ))}
                {isLoading && messages.length > 2 && ( // Only show loading after initial messages
                  <div className="flex items-start gap-3">
                    <BotAvatar />
                    <div className="bg-secondary rounded-2xl p-3 px-4 text-sm rounded-bl-none">
                      <div className="flex items-center justify-center gap-2 h-5">
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse [animation-delay:0s]"></span>
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse [animation-delay:0.2s]"></span>
                        <span className="h-2 w-2 rounded-full bg-muted-foreground animate-pulse [animation-delay:0.4s]"></span>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
            </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 bg-secondary/50 border-t">
        <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask about potholes, rubbish..."
            disabled={isLoading && messages.length === 0} // Disable only on initial load
            className="flex-1 text-base bg-background"
            aria-label="Your message"
          />
          <Button type="submit" size="icon" disabled={(isLoading && messages.length === 0) || !inputValue.trim()} aria-label="Send message">
            {(isLoading && messages.length > 0) ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
