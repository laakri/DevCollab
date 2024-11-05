import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AreaChart, Area, ResponsiveContainer } from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";

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
} from "lucide-react";
import { Footer } from "@/components/pages/Footer";
import { useProfileStore } from "@/stores/useProfileStore";
import { OverviewTab } from "./OverviewTab";

// Mock data for charts

// Start with the QuickAccess Menu component
const QuickAccessMenu = () => {
  const [isVisible, setIsVisible] = useState(true);

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

interface Profile {
  id: string;
  email: string;
  username: string;
  fullName: string;
  bio: string | null;
  company: string | null;
  role: string;
  location: string | null;
  education: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  skills: string[];
  interests: string[];
  createdAt: string;
  updatedAt: string;
  isEmailVerified: boolean;
  notificationPreferences: {
    learningReminders: boolean;
    communityActivity: boolean;
    directMessages: boolean;
    projectInvites: boolean;
    sessionReminders: boolean;
  };
  appearanceSettings: {
    theme: string;
    fontSize: string;
    codeEditorTheme: string;
  };
  privacySettings: {
    publicProfile: boolean;
    showEmail: boolean;
    showLearningProgress: boolean;
    showOnlineStatus: boolean;
    allowAnalytics: boolean;
    allowPersonalization: boolean;
  };
}

const ProfilePage = () => {
  const { profile, loading, error, fetchProfile } = useProfileStore();
  const [activeTab, setActiveTab] = useState("overview");

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

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!profile) return <div>No profile data</div>;

  return (
    <div className="min-h-screen bg-background">
      <HeroSection profile={profile} />

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
                    <span className="font-medium">{profile.skills.length}</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">
                      Current Streak
                    </span>
                    <p className="text-2xl font-bold">
                      {profile.interests.length}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <span className="text-xs text-muted-foreground">
                      Best Streak
                    </span>
                    <p className="text-2xl font-bold">
                      {profile.interests.length}
                    </p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">This Week</span>
                    <Badge variant="secondary" className="font-medium">
                      +{profile.interests.length}
                    </Badge>
                  </div>
                  <ResponsiveContainer width="100%" height={60}>
                    <AreaChart
                      data={profile.interests.map((value, index) => ({
                        day: index,
                        value,
                      }))}
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

const HeroSection = ({ profile }: { profile: Profile }) => {
  return (
    <motion.div className="relative h-[30vh] bg-gradient-to-b from-primary/10 via-primary/5 to-background overflow-hidden">
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
                  <p className="text-2xl font-bold">{profile.skills.length}</p>
                  <p className="text-sm text-muted-foreground">Skills</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">
                    {profile.interests.length}
                  </p>
                  <p className="text-sm text-muted-foreground">Interests</p>
                </div>
              </div>
            </div>

            {/* Middle Section - Main Info */}
            <div className="col-span-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold">{profile.fullName}</h1>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="font-medium">
                      {profile.role}
                    </Badge>
                    {profile.isEmailVerified && (
                      <Badge variant="outline" className="font-medium">
                        Verified
                      </Badge>
                    )}
                  </div>
                </div>

                {profile.bio && (
                  <p className="text-muted-foreground">{profile.bio}</p>
                )}

                <div className="flex items-center gap-4 pt-2">
                  {profile.location && (
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profile.location}</span>
                    </div>
                  )}
                  {profile.company && (
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profile.company}</span>
                    </div>
                  )}
                  {profile.education && (
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{profile.education}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section - Actions and Social */}
            <div className="col-span-3 space-y-4">
              <div className="flex flex-col gap-2">
                {profile.privacySettings.showEmail && (
                  <Button className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Message
                  </Button>
                )}
                <Button variant="outline" className="w-full">
                  <Users className="mr-2 h-4 w-4" />
                  Connect
                </Button>
              </div>

              <div className="flex justify-center gap-2 pt-2">
                {profile.githubUrl && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={profile.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                {profile.twitterUrl && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={profile.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Twitter className="h-5 w-5" />
                    </a>
                  </Button>
                )}
                {profile.linkedinUrl && (
                  <Button variant="ghost" size="icon" asChild>
                    <a
                      href={profile.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                )}
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
