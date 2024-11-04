import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const learningProfiles = [
  {
    id: 1,
    username: "Alice Johnson",
    offering: ["React", "TypeScript", "Node.js"],
    seeking: ["Python", "Machine Learning"],
    availability: "Evenings GMT",
    experience: "Senior Frontend Developer",
    rating: 4.8,
    successfulExchanges: 12,
    languages: ["English", "Spanish"],
    timeZone: "GMT+1",
  },
  {
    id: 2,
    username: "David Chen",
    offering: ["Python", "Django", "AWS"],
    seeking: ["React Native", "Mobile Development"],
    availability: "Weekends",
    experience: "Backend Engineer",
    rating: 4.9,
    successfulExchanges: 8,
    languages: ["English", "Mandarin"],
    timeZone: "GMT+8",
  },
  {
    id: 3,
    username: "Sarah Miller",
    offering: ["UI/UX Design", "Figma", "Adobe XD"],
    seeking: ["JavaScript", "React"],
    availability: "Morning EST",
    experience: "Product Designer",
    rating: 4.7,
    successfulExchanges: 15,
    languages: ["English", "French"],
    timeZone: "EST",
  },
  {
    id: 4,
    username: "Mohammed Ahmed",
    offering: ["Machine Learning", "TensorFlow", "Python"],
    seeking: ["Cloud Architecture", "AWS"],
    availability: "Flexible",
    experience: "ML Engineer",
    rating: 4.9,
    successfulExchanges: 20,
    languages: ["English", "Arabic"],
    timeZone: "GMT+4",
  },
  {
    id: 5,
    username: "Emma Wilson",
    offering: ["Vue.js", "Nuxt", "JavaScript"],
    seeking: ["TypeScript", "Testing"],
    availability: "Evenings PST",
    experience: "Frontend Developer",
    rating: 4.6,
    successfulExchanges: 10,
    languages: ["English"],
    timeZone: "PST",
  },
  {
    id: 6,
    username: "Carlos Rodriguez",
    offering: ["Java", "Spring Boot", "Microservices"],
    seeking: ["Kubernetes", "DevOps"],
    availability: "Weekends",
    experience: "Senior Backend Developer",
    rating: 4.8,
    successfulExchanges: 14,
    languages: ["English", "Spanish"],
    timeZone: "EST",
  },
  {
    id: 7,
    username: "Nina Patel",
    offering: ["DevOps", "Docker", "Jenkins"],
    seeking: ["Rust", "WebAssembly"],
    availability: "Early mornings",
    experience: "DevOps Engineer",
    rating: 4.7,
    successfulExchanges: 9,
    languages: ["English", "Hindi"],
    timeZone: "IST",
  },
  {
    id: 8,
    username: "Lucas Silva",
    offering: ["React Native", "Mobile Development"],
    seeking: ["Flutter", "iOS Development"],
    availability: "Evenings",
    experience: "Mobile Developer",
    rating: 4.5,
    successfulExchanges: 7,
    languages: ["English", "Portuguese"],
    timeZone: "GMT-3",
  },
  {
    id: 9,
    username: "Anna Kowalski",
    offering: ["Angular", "RxJS", "TypeScript"],
    seeking: ["React", "Next.js"],
    availability: "Weekends",
    experience: "Frontend Developer",
    rating: 4.6,
    successfulExchanges: 11,
    languages: ["English", "Polish"],
    timeZone: "CET",
  },
  {
    id: 10,
    username: "John Smith",
    offering: ["Golang", "Microservices"],
    seeking: ["Rust", "System Design"],
    availability: "Evenings GMT",
    experience: "Backend Developer",
    rating: 4.8,
    successfulExchanges: 16,
    languages: ["English"],
    timeZone: "GMT",
  },
  {
    id: 11,
    username: "Yuki Tanaka",
    offering: ["iOS Development", "Swift", "SwiftUI"],
    seeking: ["Android Development", "Kotlin"],
    availability: "Morning JST",
    experience: "iOS Developer",
    rating: 4.7,
    successfulExchanges: 13,
    languages: ["English", "Japanese"],
    timeZone: "JST",
  },
  {
    id: 12,
    username: "Maria Garcia",
    offering: ["Data Science", "Python", "R"],
    seeking: ["Deep Learning", "TensorFlow"],
    availability: "Afternoons",
    experience: "Data Scientist",
    rating: 4.9,
    successfulExchanges: 18,
    languages: ["English", "Spanish"],
    timeZone: "GMT-5",
  },
  {
    id: 13,
    username: "Alex Kim",
    offering: ["Rust", "Systems Programming"],
    seeking: ["WebAssembly", "Performance Optimization"],
    availability: "Weekends",
    experience: "Systems Engineer",
    rating: 4.8,
    successfulExchanges: 15,
    languages: ["English", "Korean"],
    timeZone: "PST",
  },
  {
    id: 14,
    username: "Sophie Martin",
    offering: ["GraphQL", "Apollo", "Node.js"],
    seeking: ["Microservices", "Docker"],
    availability: "Evenings CET",
    experience: "Full Stack Developer",
    rating: 4.6,
    successfulExchanges: 12,
    languages: ["English", "French"],
    timeZone: "CET",
  },
  {
    id: 15,
    username: "Daniel Lee",
    offering: ["Kubernetes", "Cloud Native"],
    seeking: ["Service Mesh", "GitOps"],
    availability: "Early mornings",
    experience: "Cloud Architect",
    rating: 4.9,
    successfulExchanges: 21,
    languages: ["English", "Mandarin"],
    timeZone: "SGT",
  },
  {
    id: 16,
    username: "Elena Popov",
    offering: ["Flutter", "Dart", "Mobile UI"],
    seeking: ["React Native", "iOS"],
    availability: "Flexible",
    experience: "Mobile Developer",
    rating: 4.7,
    successfulExchanges: 14,
    languages: ["English", "Russian"],
    timeZone: "MSK",
  },
  {
    id: 17,
    username: "Thomas Mueller",
    offering: ["C++", "Game Development", "Unity"],
    seeking: ["Unreal Engine", "3D Graphics"],
    availability: "Evenings CET",
    experience: "Game Developer",
    rating: 4.8,
    successfulExchanges: 17,
    languages: ["English", "German"],
    timeZone: "CET",
  },
  {
    id: 18,
    username: "Priya Sharma",
    offering: ["Next.js", "React", "Tailwind"],
    seeking: ["Backend Development", "Node.js"],
    availability: "Weekends",
    experience: "Frontend Developer",
    rating: 4.6,
    successfulExchanges: 11,
    languages: ["English", "Hindi"],
    timeZone: "IST",
  },
  {
    id: 19,
    username: "William Brown",
    offering: ["Blockchain", "Solidity", "Web3"],
    seeking: ["DeFi", "Smart Contracts"],
    availability: "Afternoons EST",
    experience: "Blockchain Developer",
    rating: 4.8,
    successfulExchanges: 19,
    languages: ["English"],
    timeZone: "EST",
  },
  {
    id: 20,
    username: "Lisa Anderson",
    offering: ["UX Research", "Design Systems", "Figma"],
    seeking: ["Frontend Development", "React"],
    availability: "Morning PST",
    experience: "UX Designer",
    rating: 4.7,
    successfulExchanges: 13,
    languages: ["English", "Swedish"],
    timeZone: "PST",
  },
];

const announcements = [
  {
    id: 1,
    title: "New Python Workshop",
    description: "Join our weekend Python basics workshop",
    date: "2024-03-25",
    type: "event",
  },
  {
    id: 2,
    title: "React Mentors Needed",
    description:
      "Looking for experienced React developers to join our mentorship program",
    date: "2024-03-22",
    type: "opportunity",
  },
];

const LearningExchangePage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  return (
    <div className="flex flex-col min-h-screen  ">
      <main className="w-full max-w-[1800px] mx-auto px-6 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Filters */}
          <div className="w-full lg:w-[300px]">
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle className="text-xl">Find Partners</CardTitle>
                <CardDescription>
                  Refine your search to find the perfect learning match
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Search Skills</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="e.g., React, Python..."
                      className="pl-10 bg-background/50 focus:bg-background transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Skill Level</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">
                          Intermediate
                        </SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Time Zone</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="gmt">GMT</SelectItem>
                        <SelectItem value="est">EST</SelectItem>
                        <SelectItem value="pst">PST</SelectItem>
                        <SelectItem value="ist">IST</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Language</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="english">English</SelectItem>
                        <SelectItem value="spanish">Spanish</SelectItem>
                        <SelectItem value="mandarin">Mandarin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Learning Partner Cards */}
          <div className="flex-1">
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold">Learning Partners</h2>
                  <p className="text-sm text-muted-foreground">
                    Found {learningProfiles.length} matches
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <Tabs defaultValue={viewMode} className="w-[200px]">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger
                        value="grid"
                        onClick={() => setViewMode("grid")}
                        className="flex items-center gap-2"
                      >
                        <LayoutGrid className="h-4 w-4" />
                        Grid
                      </TabsTrigger>
                      <TabsTrigger
                        value="list"
                        onClick={() => setViewMode("list")}
                        className="flex items-center gap-2"
                      >
                        <List className="h-4 w-4" />
                        List
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>

                  <Select defaultValue="recommended">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">Recommended</SelectItem>
                      <SelectItem value="rating">Highest Rated</SelectItem>
                      <SelectItem value="recent">Recently Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4"
                    : "space-y-4"
                }
              >
                {learningProfiles.map((profile) => (
                  <Card key={profile.id} className="border bg-background">
                    <CardContent
                      className={viewMode === "grid" ? "p-4" : "p-4"}
                    >
                      <div
                        className={`flex items-start gap-4 ${
                          viewMode === "grid" ? "flex-col" : ""
                        }`}
                      >
                        <div
                          className={`${
                            viewMode === "grid"
                              ? "w-full h-20 rounded-md"
                              : "h-12 w-12 rounded-full"
                          } bg-primary/10 flex items-center justify-center`}
                        >
                          <span className="text-lg font-semibold text-primary">
                            {profile.username.charAt(0)}
                          </span>
                        </div>

                        <div
                          className={`flex-1 space-y-3 ${
                            viewMode === "grid" ? "w-full" : ""
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-semibold text-base">
                                {profile.username}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                {profile.experience}
                              </p>
                            </div>
                            <Badge variant="outline" className="flex gap-1">
                              ⭐ {profile.rating}
                            </Badge>
                          </div>

                          <div className="flex flex-wrap gap-1.5">
                            {profile.languages.map((lang) => (
                              <Badge
                                key={lang}
                                variant="secondary"
                                className="text-xs"
                              >
                                {lang}
                              </Badge>
                            ))}
                            <Badge variant="outline" className="text-xs">
                              {profile.timeZone}
                            </Badge>
                          </div>

                          <div
                            className={
                              viewMode === "grid"
                                ? "space-y-3"
                                : "grid grid-cols-2 gap-4"
                            }
                          >
                            <div>
                              <span className="text-sm font-medium block mb-1.5">
                                Teaching
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {profile.offering.map((skill) => (
                                  <Badge
                                    key={skill}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div>
                              <span className="text-sm font-medium block mb-1.5">
                                Learning
                              </span>
                              <div className="flex flex-wrap gap-1">
                                {profile.seeking.map((skill) => (
                                  <Badge
                                    key={skill}
                                    className="text-xs bg-primary/10 text-primary"
                                  >
                                    {skill}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="flex justify-between items-center pt-2">
                            <span className="text-sm text-muted-foreground">
                              {profile.availability}
                            </span>
                            <Button size="sm">Connect & Learn</Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="w-full lg:w-[300px] space-y-2">
            {/* Featured Announcement */}
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 border-none">
              <CardHeader>
                <Badge className="w-fit mb-2">Featured</Badge>
                <CardTitle className="text-lg">Community Workshop</CardTitle>
                <CardDescription>
                  Join our upcoming workshop on Advanced React Patterns
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="secondary" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>

            {/* Announcements */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Announcements</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {announcements.map((announcement) => (
                  <Card key={announcement.id} className="bg-muted/50">
                    <CardContent className="p-4">
                      <Badge
                        className="mb-2"
                        variant={
                          announcement.type === "event"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {announcement.type}
                      </Badge>
                      <h4 className="font-semibold">{announcement.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {announcement.description}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {announcement.date}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </CardContent>
            </Card>

            {/* Live Activity Feed */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Live Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="flex items-center space-x-2 text-sm"
                    >
                      <div className="h-2 w-2 rounded-full bg-green-500"></div>
                      <p>
                        New session completed between{" "}
                        <span className="font-medium">User{i}</span> and{" "}
                        <span className="font-medium">User{i + 1}</span>
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LearningExchangePage;
