import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import {
  Brain,
  Code2,
  Rocket,
  Sparkles,
  Users,
  Calendar,
  MessageSquare,
  Network,
  Flame,
  Server,
  Globe,
} from "lucide-react";
import { Footer } from "@/components/pages/Footer";
import { Tooltip } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface CourseCard {
  id: number;
  title: string;
  level: string;
  progress: number;
  duration: string;
  icon: any;
  color: string;
  status: "completed" | "in-progress" | "locked";
}

interface Skill {
  id: number;
  name: string;
  level: string;
  icon: any;
  color: string;
  position: { x: number; y: number };
  dependencies?: number[];
}

interface StudyBuddy {
  name: string;
  skill: string;
  availability: string;
  avatar: string;
}

interface RecommendedItem {
  title: string;
  type: string;
  duration: string;
  match: string;
}

const Card3D = ({ course, index }: { course: CourseCard; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * 10;

    setRotateX(-rotateX);
    setRotateY(rotateY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "relative w-full aspect-[4/3] rounded-xl p-6 cursor-pointer perspective-1000",
        course.status === "locked" ? "opacity-50" : "opacity-100"
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      style={{
        transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease-out",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/30 backdrop-blur-sm rounded-xl border border-border/50" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent opacity-0 hover:opacity-100 transition-opacity rounded-xl" />

      <div className="relative z-10 h-full flex flex-col">
        <div className="flex items-start justify-between mb-4">
          <course.icon className={cn("h-8 w-8", course.color)} />
          <Badge
            variant={course.status === "completed" ? "default" : "outline"}
          >
            {course.level}
          </Badge>
        </div>

        <h3 className="text-xl font-bold mb-2">{course.title}</h3>
        <p className="text-sm text-muted-foreground mb-4">{course.duration}</p>

        <div className="mt-auto">
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{course.progress}%</span>
          </div>
          <Progress value={course.progress} />
        </div>
      </div>
    </motion.div>
  );
};

const TimelinePoint = ({ active }: { active: boolean }) => (
  <div className="absolute left-0 w-4 h-4 -translate-x-1/2 rounded-full bg-background border-2 border-primary/50 z-10">
    <div
      className={cn(
        "absolute inset-0.5 rounded-full bg-primary transition-opacity",
        active ? "opacity-100" : "opacity-0"
      )}
    />
  </div>
);

const QuickAccessMenu = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
  >
    <div className="bg-background/80 backdrop-blur-lg rounded-full border border-border/50 p-2 shadow-lg">
      <div className="flex items-center gap-2">
        {[
          { icon: Rocket, label: "Quick Start" },
          { icon: Users, label: "Study Group" },
          { icon: Calendar, label: "Schedule" },
          { icon: MessageSquare, label: "Discuss" },
          { icon: Brain, label: "AI Mentor" },
        ].map((item, index) => (
          <Tooltip key={index} content={item.label}>
            <Button
              variant="ghost"
              size="icon"
              className="relative group hover:bg-primary/10"
            >
              <item.icon className="h-5 w-5" />
              <span className="absolute -top-10 scale-0 group-hover:scale-100 transition-transform bg-background border border-border rounded px-2 py-1 text-xs">
                {item.label}
              </span>
            </Button>
          </Tooltip>
        ))}
      </div>
    </div>
  </motion.div>
);

const SkillTree = ({ skills }: { skills: Skill[] }) => (
  <div className="relative p-8 bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 mb-12">
    <h3 className="text-xl font-bold mb-6 flex items-center">
      <Network className="h-5 w-5 mr-2" />
      Skill Dependencies
    </h3>
    <div className="relative" style={{ height: "400px" }}>
      <svg className="absolute inset-0" style={{ zIndex: 0 }}>
        {skills.map((skill) =>
          skill.dependencies?.map((depId) => {
            const targetSkill = skills.find((s) => s.id === depId);
            if (!targetSkill) return null;

            return (
              <line
                key={`${skill.id}-${depId}`}
                x1={skill.position.x}
                y1={skill.position.y}
                x2={targetSkill.position.x}
                y2={targetSkill.position.y}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                strokeDasharray="4"
                className="animate-dash"
              />
            );
          })
        )}
      </svg>
      <div className="absolute inset-0">
        {skills.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="absolute bg-background/80 p-4 rounded-lg border border-border/50"
            style={{
              left: skill.position.x,
              top: skill.position.y,
              transform: "translate(-50%, -50%)",
              width: "160px",
            }}
          >
            <skill.icon className={cn("h-6 w-6 mb-2", skill.color)} />
            <h4 className="font-medium">{skill.name}</h4>
            <p className="text-sm text-muted-foreground">{skill.level}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
);

const StreakCalendar = () => {
  const days = Array.from({ length: 30 }, (_, i) => ({
    date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000),
    activity: Math.random() > 0.3,
  }));

  return (
    <div className="bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 p-6">
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Flame className="h-5 w-5 mr-2 text-primary" />
        Learning Streak
      </h3>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day, i) => (
          <Tooltip key={i} content={day.date.toLocaleDateString()}>
            <div
              className={cn(
                "aspect-square rounded-md border border-border/50",
                day.activity ? "bg-primary/20" : "bg-background/50"
              )}
            />
          </Tooltip>
        ))}
      </div>
    </div>
  );
};

const RecommendedContent = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 p-6"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Sparkles className="h-5 w-5 mr-2 text-primary" />
        Recommended Next Steps
      </h3>
      <div className="space-y-4">
        {[
          {
            title: "Advanced State Management",
            type: "Workshop",
            duration: "2 hours",
            match: "98% match",
          },
          {
            title: "Real-world API Integration",
            type: "Project",
            duration: "1 week",
            match: "95% match",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer group"
          >
            <div>
              <h4 className="font-medium group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-sm text-muted-foreground">
                {item.type} • {item.duration}
              </p>
            </div>
            <Badge variant="secondary">{item.match}</Badge>
          </div>
        ))}
      </div>
    </motion.div>

    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-background/50 backdrop-blur-sm rounded-xl border border-border/50 p-6"
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Users className="h-5 w-5 mr-2 text-primary" />
        Study Buddies
      </h3>
      <div className="space-y-4">
        {[
          {
            name: "Sarah Chen",
            skill: "React Expert",
            availability: "Available now",
            avatar: "SC",
          },
          {
            name: "Mike Johnson",
            skill: "Backend Dev",
            availability: "In 2 hours",
            avatar: "MJ",
          },
        ].map((buddy, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback>{buddy.avatar}</AvatarFallback>
              </Avatar>
              <div>
                <h4 className="font-medium">{buddy.name}</h4>
                <p className="text-sm text-muted-foreground">{buddy.skill}</p>
              </div>
            </div>
            <Button variant="outline" size="sm">
              Connect
            </Button>
          </div>
        ))}
      </div>
    </motion.div>
  </div>
);

// Main component with all the pieces together
const LearningJourneyPage = () => {
  const [activeSection, setActiveSection] = useState(0);
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const skillTreeData: Skill[] = [
    {
      id: 1,
      name: "React Fundamentals",
      level: "Advanced",
      icon: Code2,
      color: "text-blue-500",
      position: { x: 100, y: 100 },
      dependencies: [2, 3],
    },
    {
      id: 2,
      name: "Backend Development",
      level: "Intermediate",
      icon: Server,
      color: "text-green-500",
      position: { x: 300, y: 150 },
      dependencies: [4],
    },
    {
      id: 3,
      name: "Data Structures",
      level: "Expert",
      icon: Brain,
      color: "text-purple-500",
      position: { x: 200, y: 250 },
      dependencies: [4],
    },
    {
      id: 4,
      name: "System Design",
      level: "Beginner",
      icon: Network,
      color: "text-orange-500",
      position: { x: 400, y: 200 },
      dependencies: [],
    },
    {
      id: 5,
      name: "Cloud Computing",
      level: "Intermediate",
      icon: Globe,
      color: "text-blue-400",
      position: { x: 500, y: 150 },
      dependencies: [4],
    },
    {
      id: 6,
      name: "DevOps",
      level: "Advanced",
      icon: Server,
      color: "text-red-500",
      position: { x: 600, y: 250 },
      dependencies: [5],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Hero Section */}
      <motion.div
        className="relative h-[40vh] flex items-center justify-center overflow-hidden"
        style={{ opacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
        <div className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Badge variant="outline" className="mb-4">
              <Rocket className="h-3 w-3 mr-1" /> Your Learning Journey
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Path to Excellence
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Track your progress, unlock achievements, and master new skills
              through our structured learning paths.
            </p>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <RecommendedContent />
        <SkillTree skills={skillTreeData} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StreakCalendar />
          {/* Add more widgets here */}
        </div>
      </div>

      <QuickAccessMenu />
      <Footer />
    </div>
  );
};

export default LearningJourneyPage;
