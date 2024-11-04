import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Brain,
  BookOpen,
  Code2,
  Database,
  Globe,
  Server,
  Laptop,
  Rocket,
  Trophy,
  Users,
  Clock,
  Star,
  ChevronRight,
  Lock,
} from "lucide-react";

const LearningPathsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-4 top-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -right-4 top-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-300" />
        </div>

        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">
              🎯 Structured Learning Paths
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Master Your Skills with
              <span className="bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
                {" "}
                Guided Paths
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Follow expertly curated learning paths to build your skills from
              beginner to advanced. Track your progress and learn with peers.
            </p>
          </motion.div>

          {/* Featured Paths */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {[
              {
                title: "Frontend Master",
                icon: Laptop,
                color: "text-blue-500",
                progress: 65,
                modules: 12,
                hours: 40,
                difficulty: "Intermediate",
              },
              {
                title: "Backend Expert",
                icon: Server,
                color: "text-green-500",
                progress: 32,
                modules: 15,
                hours: 50,
                difficulty: "Advanced",
              },
              {
                title: "Full Stack Journey",
                icon: Code2,
                color: "text-purple-500",
                progress: 18,
                modules: 20,
                hours: 80,
                difficulty: "Advanced",
              },
            ].map((path, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card className="relative group hover:shadow-lg transition-all overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <path.icon className={`h-8 w-8 ${path.color}`} />
                      <Badge variant="outline">{path.difficulty}</Badge>
                    </div>
                    <CardTitle>{path.title}</CardTitle>
                    <CardDescription>
                      <div className="flex items-center space-x-4 text-sm">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-1" />
                          {path.modules} modules
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          {path.hours}h
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span className="font-medium">{path.progress}%</span>
                      </div>
                      <Progress value={path.progress} />
                    </div>
                    <Button className="w-full mt-4">Continue Learning</Button>
                  </CardContent>
                  <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Current Progress Section */}
      <section className="py-20 bg-gradient-to-b from-background to-background/80">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              Your Journey
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Current Progress</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Skills Mastered",
                value: "12",
                icon: Trophy,
                color: "text-yellow-500",
              },
              {
                title: "Hours Learned",
                value: "86",
                icon: Clock,
                color: "text-blue-500",
              },
              {
                title: "Peer Sessions",
                value: "24",
                icon: Users,
                color: "text-green-500",
              },
              {
                title: "Global Rank",
                value: "Top 10%",
                icon: Star,
                color: "text-purple-500",
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="text-center p-6">
                  <stat.icon className={`h-8 w-8 mx-auto mb-4 ${stat.color}`} />
                  <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-muted-foreground">{stat.title}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Milestones */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <Badge variant="outline" className="mb-4">
              Next Steps
            </Badge>
            <h2 className="text-3xl font-bold mb-4">Upcoming Milestones</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Advanced React Patterns",
                description: "Master advanced React concepts and patterns",
                status: "In Progress",
                daysLeft: 5,
                progress: 68,
              },
              {
                title: "System Design",
                description: "Learn to design scalable systems",
                status: "Locked",
                requiredLevel: "Level 15",
                progress: 0,
              },
              {
                title: "Cloud Architecture",
                description: "Master cloud services and deployment",
                status: "Locked",
                requiredLevel: "Level 20",
                progress: 0,
              },
            ].map((milestone, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <Card
                  className={milestone.status === "Locked" ? "opacity-75" : ""}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between mb-2">
                      <Badge
                        variant={
                          milestone.status === "Locked" ? "outline" : "default"
                        }
                      >
                        {milestone.status}
                      </Badge>
                      {milestone.status === "Locked" && (
                        <Lock className="h-4 w-4" />
                      )}
                    </div>
                    <CardTitle>{milestone.title}</CardTitle>
                    <CardDescription>{milestone.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {milestone.status === "In Progress" ? (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>{milestone.daysLeft} days left</span>
                          <span>{milestone.progress}%</span>
                        </div>
                        <Progress value={milestone.progress} />
                      </div>
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Unlock at {milestone.requiredLevel}
                      </p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LearningPathsPage;
