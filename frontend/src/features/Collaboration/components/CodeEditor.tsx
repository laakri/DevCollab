import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Play, Save, Share, Settings, Terminal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CodeEditor = () => {
  const [language, setLanguage] = useState("typescript");
  const [theme, setTheme] = useState("vs-dark");
  const [showConsole, setShowConsole] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [code, setCode] = useState(`// Welcome to the collaborative code editor
function example() {
  console.log("Hello, World!");
  console.log("This is a test output");
  return 42;
}

// Try running the code!
example();
`);

  const handleEditorChange = (value: string | undefined) => {
    if (value) setCode(value);
  };

  const executeCode = async () => {
    setIsRunning(true);
    setShowConsole(true);
    setConsoleOutput([]);

    // Capture console.log outputs
    const originalLog = console.log;
    const logs: string[] = [];

    console.log = (...args) => {
      logs.push(args.join(" "));
      originalLog.apply(console, args);
    };

    try {
      // Add timestamp to output
      const timestamp = new Date().toLocaleTimeString();
      setConsoleOutput((prev) => [...prev, `[${timestamp}] Executing code...`]);

      // Execute the code
      const result = eval(code);

      // Add the result and logs to the console output
      setConsoleOutput((prev) => [
        ...prev,
        ...logs,
        result !== undefined ? `→ ${result}` : "→ undefined",
      ]);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      setConsoleOutput((prev) => [...prev, `Error: ${errorMessage}`]);
    } finally {
      console.log = originalLog;
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="p-2 border-b flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={language} onValueChange={setLanguage}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="typescript">TypeScript</SelectItem>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="python">Python</SelectItem>
              <SelectItem value="java">Java</SelectItem>
            </SelectContent>
          </Select>

          <Select value={theme} onValueChange={setTheme}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vs-dark">Dark</SelectItem>
              <SelectItem value="light">Light</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={executeCode}
            disabled={isRunning}
          >
            <Play className={`h-4 w-4 ${isRunning ? "animate-spin" : ""}`} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setShowConsole(!showConsole)}
          >
            <Terminal className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Save className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Share className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Editor and Console */}
      <div className="flex-1 flex flex-col relative">
        <div
          className={`flex-1 transition-all duration-300 ${
            showConsole ? "h-[60%]" : "h-full"
          }`}
        >
          <Editor
            height="100%"
            language={language}
            theme={theme}
            value={code}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              wordWrap: "on",
              automaticLayout: true,
              tabSize: 2,
              formatOnPaste: true,
              formatOnType: true,
            }}
          />
        </div>

        <AnimatePresence>
          {showConsole && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "40%", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="border-t bg-black/90 text-white font-mono text-sm"
            >
              <div className="flex items-center justify-between p-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <Terminal className="h-4 w-4" />
                  <span>Console</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 hover:bg-white/10"
                  onClick={() => setShowConsole(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4 space-y-2 h-[calc(100%-40px)] overflow-auto">
                {consoleOutput.map((output, index) => (
                  <div
                    key={index}
                    className={`font-mono ${
                      output.startsWith("Error:")
                        ? "text-red-400"
                        : output.startsWith("→")
                        ? "text-green-400"
                        : "text-white"
                    }`}
                  >
                    {output}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
