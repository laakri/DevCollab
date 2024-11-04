import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Brain,
  Target,
  Clock,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Check,
  X,
  Search,
  Plus,
  Trash,
} from "lucide-react";

// Available skills for selection
const availableSkills = [
  "JavaScript",
  "Python",
  "React",
  "Node.js",
  "TypeScript",
  "Java",
  "C++",
  "Machine Learning",
  "AWS",
  "Docker",
  "DevOps",
  "UI/UX Design",
];

const MatchupPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<{
    teaching: string[];
    learning: string[];
  }>({
    teaching: [],
    learning: [],
  });
  const [timePreferences, setTimePreferences] = useState({
    timezone: "",
    availability: [] as string[],
    intensity: 50,
  });
  const [learningStyle, setLearningStyle] = useState({
    style: "",
    pacePreference: "",
    communicationPreference: "",
  });
  const [projectPreferences, setProjectPreferences] = useState({
    type: "",
    duration: "",
    complexity: "",
  });

  const steps = [
    {
      id: 1,
      title: "Skills & Goals",
      icon: Brain,
      description: "What do you want to learn and teach?",
      component: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Skills Selection</h3>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Teaching Skills */}
              <div className="space-y-4">
                <Label>Skills You Can Teach</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search skills..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSkills
                    .filter((skill) =>
                      skill.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((skill) => (
                      <Badge
                        key={skill}
                        variant={
                          selectedSkills.teaching.includes(skill)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() =>
                          setSelectedSkills((prev) => ({
                            ...prev,
                            teaching: prev.teaching.includes(skill)
                              ? prev.teaching.filter((s) => s !== skill)
                              : [...prev.teaching, skill],
                          }))
                        }
                      >
                        {skill}
                        {selectedSkills.teaching.includes(skill) ? (
                          <X className="ml-1 h-3 w-3" />
                        ) : (
                          <Plus className="ml-1 h-3 w-3" />
                        )}
                      </Badge>
                    ))}
                </div>
              </div>

              {/* Learning Skills */}
              <div className="space-y-4">
                <Label>Skills You Want to Learn</Label>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search skills..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableSkills
                    .filter((skill) =>
                      skill.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((skill) => (
                      <Badge
                        key={skill}
                        variant={
                          selectedSkills.learning.includes(skill)
                            ? "default"
                            : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() =>
                          setSelectedSkills((prev) => ({
                            ...prev,
                            learning: prev.learning.includes(skill)
                              ? prev.learning.filter((s) => s !== skill)
                              : [...prev.learning, skill],
                          }))
                        }
                      >
                        {skill}
                        {selectedSkills.learning.includes(skill) ? (
                          <X className="ml-1 h-3 w-3" />
                        ) : (
                          <Plus className="ml-1 h-3 w-3" />
                        )}
                      </Badge>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 2,
      title: "Time & Availability",
      icon: Clock,
      description: "When are you available to collaborate?",
      component: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Time Preferences</h3>
            <div className="grid gap-6">
              <div className="space-y-4">
                <Label>Your Timezone</Label>
                <Select
                  value={timePreferences.timezone}
                  onValueChange={(value) =>
                    setTimePreferences((prev) => ({ ...prev, timezone: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="utc">UTC</SelectItem>
                    <SelectItem value="est">EST</SelectItem>
                    <SelectItem value="pst">PST</SelectItem>
                    {/* Add more timezones */}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Preferred Learning Intensity</Label>
                <div className="space-y-2">
                  <Slider
                    value={[timePreferences.intensity]}
                    onValueChange={(value) =>
                      setTimePreferences((prev) => ({
                        ...prev,
                        intensity: value[0],
                      }))
                    }
                    max={100}
                    step={10}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Casual</span>
                    <span>Balanced</span>
                    <span>Intensive</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label>Availability</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {[
                    "Weekday Mornings",
                    "Weekday Afternoons",
                    "Weekday Evenings",
                    "Weekends",
                  ].map((time) => (
                    <Badge
                      key={time}
                      variant={
                        timePreferences.availability.includes(time)
                          ? "default"
                          : "outline"
                      }
                      className="cursor-pointer justify-center"
                      onClick={() =>
                        setTimePreferences((prev) => ({
                          ...prev,
                          availability: prev.availability.includes(time)
                            ? prev.availability.filter((t) => t !== time)
                            : [...prev.availability, time],
                        }))
                      }
                    >
                      {time}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 3,
      title: "Learning Style",
      icon: Target,
      description: "How do you prefer to learn and teach?",
      component: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Learning Preferences</h3>
            <div className="grid gap-6">
              <div className="space-y-4">
                <Label>Preferred Learning Style</Label>
                <Select
                  value={learningStyle.style}
                  onValueChange={(value) =>
                    setLearningStyle((prev) => ({ ...prev, style: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select learning style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="visual">Visual Learning</SelectItem>
                    <SelectItem value="practical">
                      Practical/Hands-on
                    </SelectItem>
                    <SelectItem value="theoretical">
                      Theoretical/Conceptual
                    </SelectItem>
                    <SelectItem value="mixed">Mixed Approach</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Learning Pace</Label>
                <Select
                  value={learningStyle.pacePreference}
                  onValueChange={(value) =>
                    setLearningStyle((prev) => ({
                      ...prev,
                      pacePreference: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select preferred pace" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="self-paced">Self-paced</SelectItem>
                    <SelectItem value="structured">
                      Structured/Scheduled
                    </SelectItem>
                    <SelectItem value="intensive">
                      Intensive/Fast-paced
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Communication Style</Label>
                <Select
                  value={learningStyle.communicationPreference}
                  onValueChange={(value) =>
                    setLearningStyle((prev) => ({
                      ...prev,
                      communicationPreference: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select communication style" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video Calls</SelectItem>
                    <SelectItem value="chat">Chat-based</SelectItem>
                    <SelectItem value="mixed">Mixed Communication</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: "Project Interests",
      icon: Users,
      description: "What kind of projects interest you?",
      component: (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Project Preferences</h3>
            <div className="grid gap-6">
              <div className="space-y-4">
                <Label>Project Type</Label>
                <Select
                  value={projectPreferences.type}
                  onValueChange={(value) =>
                    setProjectPreferences((prev) => ({ ...prev, type: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">Web Development</SelectItem>
                    <SelectItem value="mobile">Mobile Apps</SelectItem>
                    <SelectItem value="data">Data Science</SelectItem>
                    <SelectItem value="game">Game Development</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Project Duration</Label>
                <Select
                  value={projectPreferences.duration}
                  onValueChange={(value) =>
                    setProjectPreferences((prev) => ({
                      ...prev,
                      duration: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="short">
                      Short-term (1-2 weeks)
                    </SelectItem>
                    <SelectItem value="medium">
                      Medium-term (1-2 months)
                    </SelectItem>
                    <SelectItem value="long">Long-term (3+ months)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label>Project Complexity</Label>
                <Select
                  value={projectPreferences.complexity}
                  onValueChange={(value) =>
                    setProjectPreferences((prev) => ({
                      ...prev,
                      complexity: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project complexity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner-friendly</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle form submission
      console.log("Form submitted", {
        selectedSkills,
        timePreferences,
        learningStyle,
        projectPreferences,
      });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 py-12">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold mb-4">Find Your Perfect Match</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Let's find you the ideal learning partner based on your skills,
              schedule, and learning style.
            </p>
          </motion.div>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <Progress value={progress} className="h-2" />
          <div className="flex justify-between mt-4">
            {steps.map((step) => (
              <motion.div
                key={step.id}
                className={`flex flex-col items-center ${
                  step.id === currentStep
                    ? "text-primary"
                    : step.id < currentStep
                    ? "text-muted-foreground"
                    : "text-muted-foreground/50"
                }`}
                animate={{
                  scale: step.id === currentStep ? 1.05 : 1,
                }}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    step.id === currentStep
                      ? "bg-primary text-primary-foreground"
                      : step.id < currentStep
                      ? "bg-primary/20"
                      : "bg-muted"
                  }`}
                >
                  {step.id < currentStep ? (
                    <Check className="w-5 h-5" />
                  ) : (
                    <step.icon className="w-5 h-5" />
                  )}
                </div>
                <span className="text-sm font-medium hidden md:block">
                  {step.title}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <Card className="border-none shadow-lg">
          <CardContent className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                {steps[currentStep - 1].component}
              </motion.div>
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <Button onClick={handleNext} className="flex items-center gap-2">
            {currentStep === steps.length ? "Find Matches" : "Next"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Quick Actions */}
        <div className="mt-12 flex justify-center gap-4">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <X className="w-4 h-4" />
            Reset
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <Sparkles className="w-4 h-4" />
            Quick Match
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MatchupPage;
