import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import {
  MessageSquare,
  Maximize,
  Minimize,
  Sparkles,
  GripVertical,
} from "lucide-react";

import { ChatPanel } from "./components/ChatPanel";
import { Whiteboard } from "./components/Whiteboard";
import { CodeEditor } from "./components/CodeEditor";
import { VideoCall } from "./components/VideoCall";
import { AIAssistant } from "./components/AIAssistant";
import { Badge } from "@/components/ui/badge";

const CollaborationPage = () => {
  const [showChat, setShowChat] = useState(false);
  const [showAI, setShowAI] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div className="h-[calc(100vh-65px)] flex flex-col bg-background overflow-hidden">
      {/* Top Bar */}
      <header className="h-14 border-b flex items-center justify-between px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-semibold">React Performance Workshop</h1>
          <Badge variant="outline" className="text-sm">
            Live Session
          </Badge>
        </div>

        {/* Center Controls */}
        <div className="flex items-center space-x-2">
          <VideoCall />
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowChat(!showChat)}
          >
            <MessageSquare className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowAI(!showAI)}
          >
            <Sparkles className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize className="h-5 w-5" />
            ) : (
              <Maximize className="h-5 w-5" />
            )}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel
            defaultSize={50}
            minSize={30}
            maxSize={70}
            className="bg-background"
          >
            <CodeEditor />
          </ResizablePanel>

          <ResizableHandle className="w-2 bg-border/10 hover:bg-border/20 transition-colors">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-16 rounded-full bg-border/5 hover:bg-border/10 transition-colors flex items-center justify-center group">
              <GripVertical className="h-4 w-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
            </div>
          </ResizableHandle>

          <ResizablePanel
            defaultSize={50}
            minSize={30}
            maxSize={70}
            className="bg-background"
          >
            <Whiteboard />
          </ResizablePanel>
        </ResizablePanelGroup>

        {/* Floating Panels */}
        <AnimatePresence>
          {showChat && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <ChatPanel onClose={() => setShowChat(false)} />
            </motion.div>
          )}
          {showAI && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
            >
              <AIAssistant onClose={() => setShowAI(false)} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default CollaborationPage;
