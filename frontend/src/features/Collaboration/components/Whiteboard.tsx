import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { ChromePicker } from "react-color";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Pencil,
  Eraser,
  Undo,
  Redo,
  Save,
  Share,
  Square,
  Circle,
  Image as ImageIcon,
  Trash2,
  Download,
  Minus,
  MousePointer,
} from "lucide-react";

interface Point {
  x: number;
  y: number;
}

interface DrawElement {
  id: string;
  type: string;
  points: Point[];
  color: string;
  size: number;
}

export const Whiteboard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState<
    "pen" | "eraser" | "select" | "circle" | "square" | "line"
  >("pen");
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(2);
  const [elements, setElements] = useState<DrawElement[]>([]);
  const [selectedElement, setSelectedElement] = useState<DrawElement | null>(
    null
  );
  const [startPoint, setStartPoint] = useState<Point | null>(null);
  const [history, setHistory] = useState<DrawElement[][]>([[]]);
  const [historyIndex, setHistoryIndex] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    redrawCanvas();
  }, []);

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Get current mouse position for shape preview
    const currentPoint = {
      x: startPoint?.x || 0,
      y: startPoint?.y || 0,
    };

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach((element) => {
      if (element.type === "pen" || element.type === "eraser") {
        ctx.beginPath();
        ctx.strokeStyle = element.color;
        ctx.lineWidth = element.size;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        const points = element.points;
        if (points.length > 0) {
          ctx.moveTo(points[0].x, points[0].y);
          points.forEach((point) => {
            ctx.lineTo(point.x, point.y);
          });
        }
        ctx.stroke();
      } else {
        drawShape(ctx, element);
      }

      if (selectedElement?.id === element.id) {
        ctx.strokeStyle = "#00ff00";
        ctx.lineWidth = 2;
        const bounds = getElementBounds(element);
        ctx.strokeRect(
          bounds.x - 5,
          bounds.y - 5,
          bounds.width + 10,
          bounds.height + 10
        );
      }
    });

    // Draw shape preview
    if (
      isDrawing &&
      startPoint &&
      (tool === "circle" || tool === "square" || tool === "line")
    ) {
      const previewElement = {
        id: "preview",
        type: tool,
        points: [startPoint, currentPoint],
        color: color,
        size: size,
      };
      drawShape(ctx, previewElement);
    }
  };

  const getElementBounds = (element: DrawElement) => {
    const xs = element.points.map((p) => p.x);
    const ys = element.points.map((p) => p.y);
    return {
      x: Math.min(...xs),
      y: Math.min(...ys),
      width: Math.max(...xs) - Math.min(...xs),
      height: Math.max(...ys) - Math.min(...ys),
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const point = { x, y };

    if (tool === "select") {
      const clicked = elements.find((element) => {
        const bounds = getElementBounds(element);
        return (
          x >= bounds.x - 5 &&
          x <= bounds.x + bounds.width + 5 &&
          y >= bounds.y - 5 &&
          y <= bounds.y + bounds.height + 5
        );
      });

      setSelectedElement(clicked || null);
      setStartPoint(clicked ? point : null);
      redrawCanvas();
      return;
    }

    setIsDrawing(true);
    setStartPoint(point);

    const newElement: DrawElement = {
      id: Date.now().toString(),
      type: tool,
      points: [point],
      color: tool === "eraser" ? "#ffffff" : color,
      size,
    };

    const newElements = [...elements, newElement];
    setElements(newElements);
    addToHistory(newElements);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!startPoint) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const currentPoint = { x, y };

    if (tool === "select" && selectedElement) {
      const dx = x - startPoint.x;
      const dy = y - startPoint.y;

      setElements((prev) =>
        prev.map((el) => {
          if (el.id === selectedElement.id) {
            return {
              ...el,
              points: el.points.map((p) => ({
                x: p.x + dx,
                y: p.y + dy,
              })),
            };
          }
          return el;
        })
      );

      setStartPoint(currentPoint);
      redrawCanvas();
      return;
    }

    if (isDrawing) {
      setElements((prev) =>
        prev.map((el, index) => {
          if (index === prev.length - 1) {
            return {
              ...el,
              points: [...el.points, currentPoint],
            };
          }
          return el;
        })
      );

      redrawCanvas();
    }
  };

  const stopDrawing = () => {
    if (isDrawing) {
      addToHistory([...elements]);
    }
    setIsDrawing(false);
    setStartPoint(null);
  };

  const clearCanvas = () => {
    setElements([]);
    setSelectedElement(null);
    addToHistory([]);
    redrawCanvas();
  };

  const downloadCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = "whiteboard.png";
    link.href = canvas.toDataURL("image/png");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const drawShape = (ctx: CanvasRenderingContext2D, element: DrawElement) => {
    const startPoint = element.points[0];
    const endPoint = element.points[element.points.length - 1];

    ctx.beginPath();
    ctx.strokeStyle = element.color;
    ctx.lineWidth = element.size;

    switch (element.type) {
      case "circle":
        const radius =
          Math.sqrt(
            Math.pow(endPoint.x - startPoint.x, 2) +
              Math.pow(endPoint.y - startPoint.y, 2)
          ) / 2;
        const centerX = (startPoint.x + endPoint.x) / 2;
        const centerY = (startPoint.y + endPoint.y) / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        break;

      case "square":
        const width = endPoint.x - startPoint.x;
        const height = endPoint.y - startPoint.y;
        ctx.beginPath();
        ctx.rect(startPoint.x, startPoint.y, width, height);
        break;

      case "line":
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(endPoint.x, endPoint.y);
        break;

      default:
        ctx.moveTo(startPoint.x, startPoint.y);
        element.points.forEach((point) => {
          ctx.lineTo(point.x, point.y);
        });
    }

    ctx.stroke();
  };

  // Add keyboard event handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "Delete" || e.key === "Backspace") && selectedElement) {
        setElements((prev) =>
          prev.filter((el) => el.id !== selectedElement.id)
        );
        setSelectedElement(null);
        redrawCanvas();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedElement]);

  // Add delete button to the toolbar
  const deleteSelected = () => {
    if (selectedElement) {
      const newElements = elements.filter((el) => el.id !== selectedElement.id);
      setElements(newElements);
      setSelectedElement(null);
      addToHistory(newElements);
      redrawCanvas();
    }
  };

  // Add these functions to handle undo/redo
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setElements(history[newIndex]);
      setSelectedElement(null);
    }
  };

  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setElements(history[newIndex]);
      setSelectedElement(null);
    }
  };

  // Modify the existing functions to track history
  const addToHistory = (newElements: DrawElement[]) => {
    const updatedHistory = [...history.slice(0, historyIndex + 1), newElements];
    setHistory(updatedHistory);
    setHistoryIndex(updatedHistory.length - 1);
  };

  // Add keyboard shortcuts for undo/redo
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey) {
        if (e.key === "z") {
          e.preventDefault();
          if (e.shiftKey) {
            redo();
          } else {
            undo();
          }
        } else if (e.key === "y") {
          e.preventDefault();
          redo();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [historyIndex, history.length]);

  // Add this useEffect to watch for elements changes
  useEffect(() => {
    redrawCanvas();
  }, [elements, selectedElement]);

  return (
    <div className="h-full flex flex-col relative">
      <div className="p-2 border-b flex items-center justify-between bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="flex items-center space-x-2">
          <ToolbarButton
            Icon={MousePointer}
            tooltip="Select"
            active={tool === "select"}
            onClick={() => setTool("select")}
          />
          <ToolbarButton
            Icon={Pencil}
            tooltip="Pen"
            active={tool === "pen"}
            onClick={() => setTool("pen")}
          />
          <ToolbarButton
            Icon={Eraser}
            tooltip="Eraser"
            active={tool === "eraser"}
            onClick={() => setTool("eraser")}
          />
          <div className="w-px h-6 bg-border" />
          <ToolbarButton
            Icon={Circle}
            tooltip="Circle"
            active={tool === "circle"}
            onClick={() => setTool("circle")}
          />
          <ToolbarButton
            Icon={Square}
            tooltip="Square"
            active={tool === "square"}
            onClick={() => setTool("square")}
          />
          <ToolbarButton
            Icon={Minus}
            tooltip="Line"
            active={tool === "line"}
            onClick={() => setTool("line")}
          />
          <div className="w-px h-6 bg-border" />
          {selectedElement && (
            <ToolbarButton
              Icon={Trash2}
              tooltip="Delete Selected"
              onClick={deleteSelected}
              variant="destructive"
            />
          )}
          <div className="w-px h-6 bg-border" />
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-9 h-9 p-0"
                style={{ backgroundColor: color }}
              />
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" side="bottom" align="start">
              <ChromePicker
                color={color}
                onChange={(color) => setColor(color.hex)}
              />
            </PopoverContent>
          </Popover>

          <div className="w-[100px]">
            <Slider
              value={[size]}
              min={1}
              max={20}
              step={1}
              onValueChange={(value) => setSize(value[0])}
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <ToolbarButton
            Icon={Undo}
            tooltip="Undo (Ctrl+Z)"
            onClick={undo}
            disabled={historyIndex <= 0}
          />
          <ToolbarButton
            Icon={Redo}
            tooltip="Redo (Ctrl+Y)"
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
          />
          <div className="w-px h-6 bg-border" />
          <ToolbarButton Icon={Save} tooltip="Save" onClick={() => {}} />
          <ToolbarButton Icon={Share} tooltip="Share" onClick={() => {}} />
          <ToolbarButton
            Icon={Download}
            tooltip="Download"
            onClick={downloadCanvas}
          />
          <div className="w-px h-6 bg-border" />
          <ToolbarButton
            Icon={Trash2}
            tooltip="Clear All"
            onClick={clearCanvas}
          />
        </div>
      </div>

      <div className="flex-1 relative">
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full ${
            tool === "select" ? "cursor-move" : "cursor-crosshair"
          }`}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>
    </div>
  );
};

const ToolbarButton = ({ Icon, tooltip, active, onClick, disabled }: any) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant={active ? "default" : "ghost"}
        size="icon"
        className="h-9 w-9"
        onClick={onClick}
        disabled={disabled}
      >
        <Icon className="h-5 w-5" />
      </Button>
    </TooltipTrigger>
    <TooltipContent>
      <p>{tooltip}</p>
    </TooltipContent>
  </Tooltip>
);
