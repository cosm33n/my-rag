"use client";

import { useChat } from "@ai-sdk/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const { messages, sendMessage, status } = useChat();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    sendMessage({
      text: input,
    });
    setInput("");
    setTimeout(scrollToBottom, 100);
  };

  const isLoading = status === "submitted" || status === "streaming";

  return (
    <div className="max-w-4xl mx-auto p-6 h-[calc(100vh-64px)] flex flex-col gap-6">
      <div className="flex-1 min-h-0">
        <ScrollArea className="h-full rounded-md">
          <div className="space-y-4">
            {messages.map((message) => {
              return (
                <div
                  key={message.id}
                  className={cn("flex", message.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[80%] rounded-md p-2",
                      message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted",
                    )}
                  >
                    <div className="text-sm whitespace-pre-wrap">
                      {message.parts.map((part, i) => {
                        if (part.type === "text") {
                          return <span key={i}>{part.text}</span>;
                        }
                        return null;
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
            {isLoading && <Loader2 className="size-4 animate-spin" />}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          className="resize-none"
          rows={3}
          disabled={isLoading}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e);
            }
          }}
        />
        <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
}
