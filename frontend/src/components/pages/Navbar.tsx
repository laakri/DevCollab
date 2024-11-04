import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "../mode-toggle";
import {
  Search,
  Bell,
  MessageSquare,
  Code2,
  Laptop,
  Users,
  BookOpen,
  ChevronDown,
  LogOut,
  User,
  Settings,
  Menu,
  Rocket,
  FileText,
  GraduationCap,
  CheckCircle,
  Calendar,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuthStore } from "@/stores/useAuthStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";

export function Navbar() {
  const { user, isAuthenticated, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "m" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }

      if (e.key === "Escape") {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const NavItems = () => (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-1">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Test</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <Link to="/test">
            <DropdownMenuItem>Test Page</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-1">
            <Laptop className="h-4 w-4" />
            <span className="hidden sm:inline">Projects</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <Link to="/projects">
            <DropdownMenuItem>Browse Projects</DropdownMenuItem>
          </Link>
          <Link to="/CollaborationPage">
            <DropdownMenuItem>Featured Projects</DropdownMenuItem>
          </Link>
          <Link to="/matchup">
            <DropdownMenuItem>Start a Project</DropdownMenuItem>
          </Link>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-1">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Community</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <Link to="/learninge">
            <DropdownMenuItem>Learning Exchange</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Discussion Forums</DropdownMenuItem>
          <DropdownMenuItem>Events & Workshops</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex items-center space-x-1">
            <BookOpen className="h-4 w-4" />
            <span className="hidden sm:inline">Resources</span>
            <ChevronDown className="h-4 w-4 ml-1" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-48">
          <Link to="/docs">
            <DropdownMenuItem>Documentation</DropdownMenuItem>
          </Link>
          <DropdownMenuItem>Tutorials</DropdownMenuItem>
          <DropdownMenuItem>Best Practices</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo and Search */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-2">
              <Code2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold hidden sm:inline">
                DevCollab
              </span>
            </Link>

            {/* Search with Shortcuts */}
            <div className="hidden md:flex relative">
              <Button
                variant="outline"
                className="w-[320px] justify-start text-muted-foreground"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="mr-2 h-4 w-4" />
                Search...
                <kbd className="pointer-events-none absolute right-1.5 top-[50%] hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 -translate-y-[50%] sm:flex">
                  <span className="text-xs">⌘</span>M
                </kbd>
              </Button>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavItems />
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            {/* Mobile Search Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Authenticated Actions */}
            {isAuthenticated && (
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="icon" className="relative">
                  <MessageSquare className="h-5 w-5" />
                  <Badge
                    variant="secondary"
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
                  >
                    3
                  </Badge>
                </Button>

                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="h-5 w-5" />
                  <Badge
                    variant="secondary"
                    className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center text-xs"
                  >
                    5
                  </Badge>
                </Button>
              </div>
            )}

            <ModeToggle />

            {/* User Menu */}
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {user?.username?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <div className="flex items-center justify-start gap-2 p-2">
                    <div className="flex flex-col space-y-1 leading-none">
                      {user?.username && (
                        <p className="font-medium">{user.username}</p>
                      )}
                      {user?.email && (
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/settings")}>
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center space-x-2">
                <Link to="/login">
                  <Button variant="outline">Log In</Button>
                </Link>
                <Link to="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-[400px] p-0">
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="border-b p-4">
                    <div className="flex items-center justify-start mb-4">
                      <Code2 className="h-6 w-6 text-primary mr-2" />
                      <span className="text-xl font-bold">DevCollab</span>
                    </div>
                    {/* Mobile Search */}
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search..."
                        className="w-full pl-9"
                        onClick={() => {
                          setIsSearchOpen(true);
                        }}
                      />
                    </div>
                  </div>

                  {/* Navigation Items */}
                  <ScrollArea className="flex-1 border-b">
                    <div className="p-4 space-y-4">
                      {/* Projects Section */}
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium leading-none mb-3">
                          Projects
                        </h4>
                        <Link to="/projects" className="block">
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            <Laptop className="mr-2 h-4 w-4" />
                            Browse Projects
                          </Button>
                        </Link>
                        <Link to="/CollaborationPage" className="block">
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            <Users className="mr-2 h-4 w-4" />
                            Featured Projects
                          </Button>
                        </Link>
                        <Link to="/matchup" className="block">
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            <Rocket className="mr-2 h-4 w-4" />
                            Start a Project
                          </Button>
                        </Link>
                      </div>

                      {/* Community Section */}
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium leading-none mb-3">
                          Community
                        </h4>
                        <Link to="/learninge" className="block">
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            <BookOpen className="mr-2 h-4 w-4" />
                            Learning Exchange
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <MessageSquare className="mr-2 h-4 w-4" />
                          Discussion Forums
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <Calendar className="mr-2 h-4 w-4" />
                          Events & Workshops
                        </Button>
                      </div>

                      {/* Resources Section */}
                      <div className="space-y-1">
                        <h4 className="text-sm font-medium leading-none mb-3">
                          Resources
                        </h4>
                        <Link to="/docs" className="block">
                          <Button
                            variant="ghost"
                            className="w-full justify-start"
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            Documentation
                          </Button>
                        </Link>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <GraduationCap className="mr-2 h-4 w-4" />
                          Tutorials
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full justify-start"
                        >
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Best Practices
                        </Button>
                      </div>
                    </div>
                  </ScrollArea>

                  {/* Footer Actions */}
                  <div className="p-4">
                    {isAuthenticated ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-4 pb-4">
                          <Avatar className="h-10 w-10">
                            <AvatarFallback>
                              {user?.username?.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="font-medium">
                              {user?.username}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              {user?.email}
                            </span>
                          </div>
                        </div>
                        <Button onClick={handleLogout} className="w-full">
                          <LogOut className="mr-2 h-4 w-4" />
                          Log out
                        </Button>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <Link to="/login" className="w-full">
                          <Button variant="outline" className="w-full">
                            Log In
                          </Button>
                        </Link>
                        <Link to="/signup" className="w-full">
                          <Button className="w-full">Sign Up</Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Search Dialog */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-50">
            {/* Blurred backdrop */}
            <div className="absolute inset-0 bg-background/80 backdrop-blur-md" />

            {/* Content */}
            <div className="relative">
              <div className="fixed left-[50%] top-[20%] z-50 grid w-full max-w-lg translate-x-[-50%] gap-4 border bg-background/95 p-6 shadow-lg sm:rounded-lg backdrop-blur-sm">
                {/* Close Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100"
                  onClick={() => setIsSearchOpen(false)}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Button>

                <div className="flex items-center border-b pb-4">
                  <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
                  <input
                    className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Search developers, projects, skills..."
                    autoFocus
                  />
                </div>
                <div className="flex flex-col space-y-4 mb-4">
                  <p className="text-sm text-muted-foreground">Quick Links</p>
                  <div className="grid grid-cols-2 gap-2">
                    <Button variant="outline" className="justify-start">
                      <Users className="mr-2 h-4 w-4" />
                      Find Developers
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Laptop className="mr-2 h-4 w-4" />
                      Browse Projects
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Documentation
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Community
                    </Button>
                  </div>
                </div>

                {/* Keyboard shortcut hint */}
                <div className="absolute bottom-2 right-4 flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">Press</span>
                  <kbd className="pointer-events-none h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 inline-flex">
                    ESC
                  </kbd>
                  <span className="text-xs text-muted-foreground">
                    to close
                  </span>
                </div>
              </div>
            </div>

            {/* Clickable overlay to close */}
            <div
              className="fixed inset-0 z-40 cursor-pointer"
              onClick={() => setIsSearchOpen(false)}
            />
          </div>
        )}
      </div>
    </header>
  );
}
