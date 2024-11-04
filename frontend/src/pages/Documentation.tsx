import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import {
  Book,
  Search,
  ExternalLink,
  Code2,
  Rocket,
  Users,
  Shield,
} from "lucide-react";

// Navigation structure
const docsNavigation = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "#introduction" },
      { title: "Quick Start", href: "#quick-start" },
      { title: "Installation", href: "#installation" },
      { title: "Architecture", href: "#architecture" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { title: "User Management", href: "#user-management" },
      { title: "Authentication", href: "#authentication" },
      { title: "Learning Paths", href: "#learning-paths" },
      { title: "Skill Tracking", href: "#skill-tracking" },
    ],
  },
  {
    title: "Features",
    items: [
      { title: "Developer Matching", href: "#developer-matching" },
      { title: "Real-time Collaboration", href: "#collaboration" },
      { title: "Code Sharing", href: "#code-sharing" },
      { title: "Progress Analytics", href: "#analytics" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { title: "REST API", href: "#rest-api" },
      { title: "WebSocket API", href: "#websocket-api" },
      { title: "Authentication", href: "#api-auth" },
      { title: "Rate Limiting", href: "#rate-limiting" },
    ],
  },
  {
    title: "Deployment",
    items: [
      { title: "Self Hosting", href: "#self-hosting" },
      { title: "Docker Setup", href: "#docker" },
      { title: "Environment Variables", href: "#env-variables" },
      { title: "Production Checklist", href: "#production" },
    ],
  },
];

const DocumentationPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("introduction");

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-80 border-r flex flex-col">
        {/* Sidebar Header */}
        <div className="p-6 border-b">
          <div className="flex items-center gap-2 mb-4">
            <Book className="h-6 w-6 text-primary" />
            <h2 className="font-semibold">Documentation</h2>
          </div>
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search documentation..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Navigation */}
        <ScrollArea className="flex-1 py-6">
          <div className="px-4 space-y-6">
            {docsNavigation.map((section, idx) => (
              <div key={idx} className="space-y-3">
                <h3 className="font-semibold text-sm text-muted-foreground px-2">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item, itemIdx) => (
                    <li key={itemIdx}>
                      <Button
                        variant={
                          activeSection === item.href.slice(1)
                            ? "secondary"
                            : "ghost"
                        }
                        className="w-full justify-start text-sm"
                        onClick={() => setActiveSection(item.href.slice(1))}
                      >
                        {item.title}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Sidebar Footer */}
        <div className="p-4 border-t">
          <Button variant="outline" className="w-full">
            <ExternalLink className="mr-2 h-4 w-4" />
            View on GitHub
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-8 py-12">
          {/* Version Badge */}
          <div className="mb-8">
            <Badge variant="outline" className="mb-4">
              v1.0.0
            </Badge>
            <h1 className="text-4xl font-bold mb-4">Introduction</h1>
            <p className="text-xl text-muted-foreground">
              Learn how to integrate and use DevCollab in your development
              workflow.
            </p>
          </div>

          {/* Content Sections */}
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>Overview</h2>
            <p>
              DevCollab is a comprehensive platform designed to facilitate
              collaborative learning and development among software developers.
              It provides tools for skill matching, real-time collaboration, and
              progress tracking.
            </p>

            <h3>Key Features</h3>
            <div className="grid grid-cols-2 gap-6 not-prose my-8">
              {[
                {
                  icon: Users,
                  title: "Smart Matching",
                  description:
                    "Connect with developers who complement your skills",
                },
                {
                  icon: Code2,
                  title: "Live Collaboration",
                  description: "Real-time code sharing and pair programming",
                },
                {
                  icon: Rocket,
                  title: "Learning Paths",
                  description:
                    "Structured learning journeys for different skills",
                },
                {
                  icon: Shield,
                  title: "Secure Platform",
                  description: "Enterprise-grade security for your data",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="p-6 rounded-lg border bg-card text-card-foreground"
                >
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            <h3>Prerequisites</h3>
            <ul>
              <li>Node.js 16 or higher</li>
              <li>npm or yarn package manager</li>
              <li>Basic understanding of React and TypeScript</li>
            </ul>

            <h3>Installation</h3>
            <pre className="language-bash">
              <code>npm install @devcollab/core @devcollab/react</code>
            </pre>

            {/* Add more content sections as needed */}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DocumentationPage;
