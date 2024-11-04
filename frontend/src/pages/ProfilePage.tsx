import { useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
  useSpring,
} from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectItem,
  SelectContent,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

// Import all icons
import {
  Github,
  Twitter,
  Linkedin,
  Mail,
  Trophy,
  Brain,
  Rocket,
  Globe,
  Users,
  CalendarArrowDown,
  MessageSquare,
  BarChart as BarChartIcon,
  Clock,
  Zap,
  TrendingUp,
  CheckCircle,
  ExternalLink,
  Settings,
  Calendar as CalendarIcon,
  Building2,
  GraduationCap,
  Book,
  CircleDot,
  Star,
  GitFork,
  GitCommit,
  GitPullRequest,
} from "lucide-react";
import { Footer } from "@/components/pages/Footer";

interface ProfileStats {
  contributions: {
    total: number;
    thisWeek: number;
    trend: number;
  };
  streak: {
    current: number;
    longest: number;
    thisYear: number[];
  };
  impact: {
    peopleHelped: number;
    contentViews: number;
    topContent: {
      title: string;
      views: number;
      engagement: number;
    }[];
  };
  learning: {
    hoursSpent: number;
    coursesCompleted: number;
    certificatesEarned: number;
    skillsLearned: number;
  };
}

// Mock data for charts
const contributionData = [
  { month: "Jan", commits: 120, prs: 35, issues: 25 },
  { month: "Feb", commits: 150, prs: 42, issues: 30 },
  { month: "Mar", commits: 180, prs: 48, issues: 28 },
  { month: "Apr", commits: 220, prs: 55, issues: 35 },
  { month: "May", commits: 250, prs: 60, issues: 40 },
  { month: "Jun", commits: 280, prs: 65, issues: 45 },
];

const skillDistribution = [
  { name: "Frontend", value: 35 },
  { name: "Backend", value: 30 },
  { name: "DevOps", value: 20 },
  { name: "Design", value: 15 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// Start with the QuickAccess Menu component
const QuickAccessMenu = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsVisible(currentScrollY < lastScrollY || currentScrollY < 100);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="bg-background/80 backdrop-blur-lg rounded-full border border-border/50 p-2 shadow-lg">
            <div className="flex items-center gap-2">
              {[
                {
                  icon: Rocket,
                  label: "Quick Start",
                  action: () => {},
                  color: "text-blue-500",
                },
                {
                  icon: Brain,
                  label: "AI Mentor",
                  action: () => {},
                  color: "text-purple-500",
                },
                {
                  icon: Users,
                  label: "Network",
                  action: () => {},
                  color: "text-green-500",
                },
                {
                  icon: MessageSquare,
                  label: "Messages",
                  action: () => {},
                  color: "text-yellow-500",
                },
                {
                  icon: CalendarArrowDown,
                  label: "Schedule",
                  action: () => {},
                  color: "text-red-500",
                },
                {
                  icon: Settings,
                  label: "Settings",
                  action: () => {},
                  color: "text-gray-500",
                },
              ].map((item, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  size="icon"
                  className={cn(
                    "relative group hover:bg-primary/10 transition-all duration-300",
                    item.color
                  )}
                  onClick={item.action}
                >
                  <item.icon className="h-5 w-5" />
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    whileHover={{ opacity: 1, y: 0 }}
                    className="absolute -top-10 bg-background border border-border rounded px-2 py-1 text-xs whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                </Button>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const OverviewTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Pinned Projects */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Pinned Projects</h2>
        <div className="grid grid-cols-2 gap-4">
          {[
            {
              name: "next-auth-example",
              description:
                "An example app showing how to use NextAuth.js for authentication",
              language: "TypeScript",
              stars: 245,
              forks: 64,
              updated: "Updated 3 days ago",
            },
            {
              name: "react-dashboard",
              description:
                "Modern dashboard template built with React and Tailwind CSS",
              language: "JavaScript",
              stars: 182,
              forks: 35,
              updated: "Updated yesterday",
            },
            // Add more pinned projects as needed
          ].map((project, index) => (
            <Card
              key={index}
              className="border hover:border-primary/50 transition-colors"
            >
              <CardHeader className="space-y-1">
                <div className="flex items-center gap-2">
                  <Book className="h-4 w-4 text-primary" />
                  <CardTitle className="text-base font-medium text-primary">
                    {project.name}
                  </CardTitle>
                </div>
                <CardDescription className="line-clamp-2">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <CircleDot className="h-3 w-3" />
                    <span>{project.language}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>{project.stars}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="h-3 w-3" />
                    <span>{project.forks}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Contribution Activity */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Contribution Activity</h2>
          <Select defaultValue="year">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="year">Last year</SelectItem>
              <SelectItem value="month">Last month</SelectItem>
              <SelectItem value="week">Last week</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <Card>
          <CardContent className="pt-6">
            <div className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={contributionData}>
                  <defs>
                    <linearGradient
                      id="colorContributions"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.2}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <XAxis
                    dataKey="month"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--background))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "6px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="commits"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorContributions)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Recent Activity */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
        <div className="space-y-4">
          {[
            {
              type: "commit",
              repo: "next-auth-example",
              message: "Update authentication flow and add tests",
              time: "2 hours ago",
            },
            {
              type: "pr",
              repo: "react-dashboard",
              message: "Add dark mode support",
              time: "1 day ago",
            },
            {
              type: "issue",
              repo: "typescript-starter",
              message: "Fix build configuration for production",
              time: "2 days ago",
            },
          ].map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors"
            >
              {activity.type === "commit" && (
                <GitCommit className="h-5 w-5 text-green-500 mt-0.5" />
              )}
              {activity.type === "pr" && (
                <GitPullRequest className="h-5 w-5 text-blue-500 mt-0.5" />
              )}
              {activity.type === "issue" && (
                <CircleDot className="h-5 w-5 text-red-500 mt-0.5" />
              )}
              <div className="flex-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.repo}</span>:{" "}
                  {activity.message}
                </p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Button variant="ghost" size="icon">
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

// Add this new component for the right sidebar
const RightSidebar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <div className="space-y-6">
      {/* Upcoming Events Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarIcon className="h-5 w-5 text-primary" />
            Calendar & Events
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="rounded-md border"
          />

          {/* Upcoming Events List */}
          <div className="space-y-4 mt-4">
            <h3 className="text-sm font-medium">Upcoming Events</h3>
            {[
              {
                title: "Team Meeting",
                date: "Today, 2:00 PM",
                type: "meeting",
              },
              {
                title: "Project Deadline",
                date: "Tomorrow, 5:00 PM",
                type: "deadline",
              },
              {
                title: "Code Review",
                date: "Wed, 11:00 AM",
                type: "review",
              },
            ].map((event, index) => (
              <div
                key={index}
                className="flex items-center gap-3 text-sm p-2 rounded-md hover:bg-muted/50 transition-colors"
              >
                <div className="flex flex-col flex-1">
                  <span className="font-medium">{event.title}</span>
                  <span className="text-muted-foreground">{event.date}</span>
                </div>
                <Button variant="ghost" size="icon">
                  <ExternalLink className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Quick Stats
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              {
                label: "Hours Coded",
                value: "28h",
                change: "+2.5h",
                icon: Clock,
              },
              {
                label: "Tasks Completed",
                value: "12",
                change: "+3",
                icon: CheckCircle,
              },
              {
                label: "Efficiency",
                value: "94%",
                change: "+2%",
                icon: Zap,
              },
            ].map((stat, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-md">
                  <stat.icon className="h-4 w-4 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-semibold">{stat.value}</span>
                    <Badge variant="secondary" className="text-xs">
                      {stat.change}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  const profileStats: ProfileStats = {
    contributions: {
      total: 1247,
      thisWeek: 37,
      trend: 12.5,
    },
    streak: {
      current: 15,
      longest: 45,
      thisYear: [
        4, 6, 2, 8, 5, 9, 7, 3, 5, 8, 9, 4, 6, 7, 8, 9, 3, 4, 6, 7, 8, 5, 4, 7,
        8, 9, 4, 2, 5, 7,
      ],
    },
    impact: {
      peopleHelped: 324,
      contentViews: 15680,
      topContent: [
        { title: "Advanced React Patterns", views: 5200, engagement: 89 },
        { title: "System Design Guide", views: 3400, engagement: 92 },
      ],
    },
    learning: {
      hoursSpent: 486,
      coursesCompleted: 24,
      certificatesEarned: 8,
      skillsLearned: 15,
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <HeroSection profile={profileStats} opacity={opacity} />

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4 mt-6 "
      >
        <div className="grid grid-cols-12 gap-6">
          {/* Left Sidebar */}
          <motion.div
            variants={item}
            className="col-span-12 md:col-span-3 space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-primary" />
                  Impact Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Contributions</span>
                    <span className="font-medium">
                      {profileStats.contributions.total}
                    </span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">
                      Current Streak
                    </span>
                    <p className="text-2xl font-bold">
                      {profileStats.streak.current} days
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">
                      Best Streak
                    </span>
                    <p className="text-2xl font-bold">
                      {profileStats.streak.longest} days
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">This Week</span>
                    <Badge variant="secondary" className="font-medium">
                      +{profileStats.contributions.thisWeek}
                    </Badge>
                  </div>
                  <ResponsiveContainer width="100%" height={60}>
                    <AreaChart
                      data={profileStats.streak.thisYear.map(
                        (value, index) => ({ day: index, value })
                      )}
                    >
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--primary))"
                        fill="hsl(var(--primary))"
                        fillOpacity={0.1}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Area */}
          <motion.div
            variants={item}
            className="col-span-12 md:col-span-6 space-y-6"
          >
            <Tabs
              defaultValue="overview"
              value={activeTab}
              onValueChange={setActiveTab}
            >
              <TabsList className="grid grid-cols-4 w-full">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="projects">Projects</TabsTrigger>
                <TabsTrigger value="skills">Skills</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <OverviewTab />
              </TabsContent>

              <TabsContent value="projects">
                <ProjectsTab />
              </TabsContent>

              <TabsContent value="skills">
                <SkillsTab />
              </TabsContent>

              <TabsContent value="activity">
                <ActivityTab />
              </TabsContent>
            </Tabs>
          </motion.div>

          {/* Right Sidebar */}
          <motion.div
            variants={item}
            className="col-span-12 md:col-span-3 space-y-6"
          >
            <RightSidebar />
          </motion.div>
        </div>
      </motion.div>

      <QuickAccessMenu />
      <Footer />
    </div>
  );
};

const HeroSection = ({
  profile,
  opacity,
}: {
  profile: ProfileStats;
  opacity: any;
}) => {
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const springOpacity = useSpring(opacity, springConfig);

  return (
    <motion.div
      className="relative h-[30vh] bg-gradient-to-b from-primary/10 via-primary/5 to-background overflow-hidden"
      style={{ opacity: springOpacity }}
    >
      <div className="container mx-auto h-full px-4">
        <div className="flex flex-col h-full justify-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-12 gap-6 items-center"
          >
            {/* Left Section - Avatar and Stats */}
            <div className="col-span-3 flex flex-col items-center gap-4">
              <Avatar className="w-32 h-32 border-4 border-background shadow-xl">
                <AvatarImage src="https://i.gyazo.com/098567d12767254bc632b8b14ad9e37d.png" />
                <AvatarFallback>JP</AvatarFallback>
              </Avatar>
              <div className="flex gap-4 mt-2">
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {profile.contributions.total}
                  </p>
                  <p className="text-sm text-muted-foreground">Contributions</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{profile.streak.current}</p>
                  <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
              </div>
            </div>

            {/* Middle Section - Main Info */}
            <div className="col-span-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">John Developer</h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-medium">
                      Pro Member
                    </Badge>
                    <Badge variant="outline" className="font-medium">
                      Top Contributor
                    </Badge>
                    <Badge variant="outline" className="font-medium">
                      {profile.learning.certificatesEarned} Certificates
                    </Badge>
                  </div>
                </div>

                <p className="text-muted-foreground">
                  Senior Full-Stack Developer specializing in React, Node.js,
                  and Cloud Architecture. Open source contributor and tech
                  community mentor.
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">San Francisco, CA</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">TechCorp Inc.</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Computer Science, MIT</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Section - Actions and Social */}
            <div className="col-span-3 space-y-4">
              <div className="flex flex-col gap-2">
                <Button className="w-full">
                  <Mail className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              </div>

              <div className="flex justify-center gap-2 pt-2">
                <Button variant="ghost" size="icon">
                  <Github className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Linkedin className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Add these placeholder components for other tabs
const ProjectsTab = () => (
  <div className="space-y-6">
    <h2>Projects Coming Soon</h2>
  </div>
);

const SkillsTab = () => (
  <div className="space-y-6">
    <h2>Skills Coming Soon</h2>
  </div>
);

const ActivityTab = () => (
  <div className="space-y-6">
    <h2>Activity Coming Soon</h2>
  </div>
);

export default ProfilePage;
