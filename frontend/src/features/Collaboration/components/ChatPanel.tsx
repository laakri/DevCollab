import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare, X, Send, Paperclip, Image, Smile } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ChatPanelProps {
  onClose: () => void;
}

export const ChatPanel = ({ onClose }: ChatPanelProps) => {
  const [messages, setMessages] = useState<
    Array<{
      id: number;
      sender: string;
      content: string;
      timestamp: Date;
      avatar?: string;
    }>
  >([
    {
      id: 1,
      sender: "Alice Johnson",
      content: "Hi! Ready to start the session?",
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      avatar: "https://github.com/shadcn.png",
    },
    {
      id: 2,
      sender: "You",
      content:
        "Yes, let's begin! I have some questions about React performance optimization.",
      timestamp: new Date(Date.now() - 1000 * 60 * 4),
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        sender: "You",
        content: input,
        timestamp: new Date(),
      },
    ]);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="absolute top-[3.5rem] right-0 w-[400px] h-[calc(100vh-3.5rem)] bg-background border-l shadow-lg"
    >
      <Card className="h-full rounded-none border-0">
        <CardHeader className="border-b px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Chat</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 flex flex-col h-[calc(100%-4rem)]">
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "You" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className="flex gap-2 max-w-[80%]">
                    {message.sender !== "You" && (
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={message.avatar} />
                        <AvatarFallback>
                          {message.sender.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      {message.sender !== "You" && (
                        <div className="text-sm font-medium mb-1">
                          {message.sender}
                        </div>
                      )}
                      <div
                        className={`rounded-lg p-3 ${
                          message.sender === "You"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex gap-2"
            >
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button variant="ghost" size="icon">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Image className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Smile className="h-4 w-4" />
              </Button>
              <Button type="submit" size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
