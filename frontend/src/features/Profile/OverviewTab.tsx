import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";
import { MessageSquare, ThumbsUp, GitFork, Pin } from "lucide-react";
import React from "react";

interface PinnedPost {
  id: string;
  title: string;
  description: string;
  tags: string[];
  likes: number;
  comments: number;
  createdAt: string;
}

interface Activity {
  id: string;
  type: "collaboration" | "comment" | "fork" | "like";
  project: string;
  description: string;
  timestamp: string;
  user: {
    name: string;
    avatar: string;
  };
}

export const OverviewTab = () => {
  // Mock data - replace with real data
  const pinnedPosts: PinnedPost[] = [
    {
      id: "1",
      title: "Building a Real-time Collaboration Platform",
      description:
        "A deep dive into WebSocket implementation for real-time features",
      tags: ["WebSocket", "React", "Node.js"],
      likes: 124,
      comments: 35,
      createdAt: "2024-02-15",
    },
    {
      id: "2",
      title: "Open Source Contribution Guide",
      description:
        "Step-by-step guide for making your first open source contribution",
      tags: ["Open Source", "Git", "Collaboration"],
      likes: 89,
      comments: 21,
      createdAt: "2024-02-10",
    },
  ];

  const recentActivity: Activity[] = [
    {
      id: "1",
      type: "collaboration",
      project: "AI Code Assistant",
      description: "joined as a collaborator",
      timestamp: "2024-03-10T10:00:00",
      user: {
        name: "Alex Chen",
        avatar: "https://github.com/shadcn.png",
      },
    },
    // Add more activities...
  ];

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "collaboration":
        return GitFork;
      case "comment":
        return MessageSquare;
      case "like":
        return ThumbsUp;
      case "fork":
        return GitFork;
      default:
        return MessageSquare;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Pinned Posts */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Pin className="h-5 w-5" />
          <h3 className="font-semibold">Pinned Posts</h3>
        </div>

        <div className="space-y-4">
          {pinnedPosts.map((post) => (
            <Card key={post.id} className="hover:bg-accent/5 transition-colors">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-semibold hover:text-primary cursor-pointer">
                      {post.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {post.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <ThumbsUp className="h-4 w-4" /> {post.likes}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" /> {post.comments}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="space-y-4">
        <h3 className="font-semibold">Recent Activity</h3>
        <div className="space-y-4">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
            >
              <Avatar className="h-10 w-10">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback>{activity.user.name[0]}</AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span>{" "}
                  {activity.description}{" "}
                  <span className="font-medium text-primary">
                    {activity.project}
                  </span>
                </p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(activity.timestamp), {
                    addSuffix: true,
                  })}
                </p>
              </div>

              {React.createElement(getActivityIcon(activity.type), {
                className: "h-5 w-5 text-muted-foreground",
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
