import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Rocket,
  Brain,
  Globe,
  ArrowRight,
  MessageSquare,
  Calendar,
  ChevronRight,
  Star,
  Search,
} from "lucide-react";
import { Footer } from "@/components/pages/Footer";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -left-4 top-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -right-4 top-1/2 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-300" />
          <div className="absolute left-1/2 bottom-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500" />
        </div>

        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">
              🚀 Join the Future of Learning
            </Badge>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-6 bg-gradient-to-r from-primary to-primary/50 bg-clip-text text-transparent">
              Connect. Learn. Grow Together.
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              DevCollab is where developers meet to exchange knowledge,
              collaborate on projects, and grow their skills through
              peer-to-peer learning.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="px-8">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Explore Features
              </Button>
            </div>

            {/* Stats Banner */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 bg-background/60 backdrop-blur-xl rounded-2xl border border-border/50 p-8"
            >
              {[
                { icon: Users, label: "Active Users", value: "10,000+" },
                { icon: MessageSquare, label: "Daily Sessions", value: "500+" },
                { icon: Brain, label: "Skills Shared", value: "1,000+" },
                { icon: Star, label: "Success Rate", value: "94%" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-background/80">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              Features
            </Badge>
            <h2 className="text-4xl font-bold mb-4">
              Everything You Need to Grow
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our platform provides all the tools and features you need to
              connect with other developers and accelerate your learning
              journey.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Global Community",
                description:
                  "Connect with developers from around the world and share knowledge across borders.",
                features: [
                  "Real-time collaboration",
                  "Multi-language support",
                  "24/7 availability",
                ],
              },
              {
                icon: Brain,
                title: "Smart Matching",
                description:
                  "Our AI-powered system matches you with the perfect learning partners based on your goals.",
                features: [
                  "Skill-based matching",
                  "Timezone optimization",
                  "Learning style compatibility",
                ],
              },
              {
                icon: Calendar,
                title: "Structured Learning",
                description:
                  "Organize your learning sessions with built-in scheduling and progress tracking.",
                features: [
                  "Interactive whiteboard",
                  "Session recording",
                  "Progress analytics",
                ],
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.5 }}
              >
                <Card className="bg-background/60 backdrop-blur-xl border-border/50 hover:shadow-lg transition-all">
                  <CardContent className="p-6">
                    <feature.icon className="h-12 w-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {feature.description}
                    </p>
                    <ul className="space-y-2">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-center text-sm">
                          <ChevronRight className="h-4 w-4 text-primary mr-2" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-background" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              Simple Process
            </Badge>
            <h2 className="text-4xl font-bold mb-4">How DevCollab Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get started in minutes and begin your learning journey with these
              simple steps
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Create Profile",
                description:
                  "Set up your developer profile with skills and learning goals",
                icon: Users,
                color: "text-blue-500",
              },
              {
                step: "02",
                title: "Find Partners",
                description:
                  "Match with developers who complement your learning goals",
                icon: Search,
                color: "text-green-500",
              },
              {
                step: "03",
                title: "Schedule Sessions",
                description:
                  "Plan and organize learning sessions that fit your schedule",
                icon: Calendar,
                color: "text-purple-500",
              },
              {
                step: "04",
                title: "Learn & Grow",
                description:
                  "Collaborate, share knowledge, and track your progress",
                icon: Rocket,
                color: "text-orange-500",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="relative"
              >
                <div className="bg-background/80 backdrop-blur-xl rounded-2xl border border-border/50 p-6 h-full">
                  <div className={`text-4xl font-bold ${item.color} mb-4`}>
                    {item.step}
                  </div>
                  <item.icon className={`h-8 w-8 ${item.color} mb-4`} />
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-muted-foreground" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Latest Activity Feed */}
      <section className="py-24 bg-gradient-to-b from-background/50 to-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Live Activity */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-8">
                Live Learning Activity
              </h2>
              <div className="space-y-4">
                {[
                  {
                    type: "session",
                    title: "React Performance Optimization",
                    users: ["Sarah M.", "John D."],
                    time: "2 minutes ago",
                  },
                  {
                    type: "collaboration",
                    title: "Building a GraphQL API",
                    users: ["Alex K.", "Maria R."],
                    time: "5 minutes ago",
                  },
                  {
                    type: "milestone",
                    title: "Completed Full Stack Project",
                    users: ["David L."],
                    time: "10 minutes ago",
                  },
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-background/60 backdrop-blur-xl rounded-lg border border-border/50 p-4"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-2 rounded-full bg-green-500" />
                        <div>
                          <p className="font-medium">{activity.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {activity.users.join(" & ")}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {activity.time}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Success Stories */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h2 className="text-3xl font-bold mb-8">Success Stories</h2>
              <div className="space-y-6">
                {[
                  {
                    name: "Emily Chen",
                    role: "Frontend Developer",
                    company: "Tech Corp",
                    image: "https://i.pravatar.cc/100?img=1",
                    quote:
                      "DevCollab helped me transition from backend to frontend development in just 3 months!",
                  },
                  {
                    name: "Marcus Johnson",
                    role: "Full Stack Developer",
                    company: "Startup Inc",
                    image: "https://i.pravatar.cc/100?img=2",
                    quote:
                      "The peer learning approach here is revolutionary. I learned more in weeks than I did in months of solo study.",
                  },
                ].map((story, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-background/60 backdrop-blur-xl rounded-lg border border-border/50 p-6"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={story.image}
                        alt={story.name}
                        className="h-12 w-12 rounded-full"
                      />
                      <div>
                        <p className="italic mb-2">{story.quote}</p>
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{story.name}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-sm text-muted-foreground">
                            {story.role} at {story.company}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      {/* Featured Technologies */}
      <section className="py-24 bg-gradient-to-b from-background to-background/90">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-16"
          >
            <Badge variant="outline" className="mb-4">
              Technologies
            </Badge>
            <h2 className="text-4xl font-bold mb-4">Learn What Matters</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Stay current with the most in-demand technologies and frameworks
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              "React",
              "Node.js",
              "Python",
              "TypeScript",
              "AWS",
              "Docker",
              "GraphQL",
              "MongoDB",
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-background/60 backdrop-blur-xl rounded-lg border border-border/50 p-4 text-center hover:border-primary/50 transition-colors"
              >
                <h3 className="font-semibold">{tech}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-background" />
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl font-bold mb-4">
              Ready to Start Your Learning Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of developers who are already learning and growing
              together.
            </p>
            <div className="flex items-center justify-center gap-4">
              <Button size="lg" className="px-8">
                Get Started Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline">
                Schedule a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;
