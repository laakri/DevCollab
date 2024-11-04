import { useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Lock,
  Bell,
  Palette,
  Shield,
  Trash2,
  Upload,
  Github,
  Linkedin,
  Twitter,
  Sun,
  Moon,
  Laptop,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

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

  return (
    <div className="min-h-screen bg-background py-8">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="container mx-auto px-4"
      >
        <div className="flex flex-col gap-8">
          {/* Header */}
          <motion.div variants={item} className="space-y-2">
            <h1 className="text-3xl font-bold">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account settings and preferences
            </p>
          </motion.div>

          {/* Main Content */}
          <motion.div variants={item}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-5 w-full max-w-[600px]">
                <TabsTrigger value="profile">
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </TabsTrigger>
                <TabsTrigger value="account">
                  <Lock className="w-4 h-4 mr-2" />
                  Account
                </TabsTrigger>
                <TabsTrigger value="notifications">
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </TabsTrigger>
                <TabsTrigger value="appearance">
                  <Palette className="w-4 h-4 mr-2" />
                  Appearance
                </TabsTrigger>
                <TabsTrigger value="privacy">
                  <Shield className="w-4 h-4 mr-2" />
                  Privacy
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="profile">
                  <ProfileSettings />
                </TabsContent>
                <TabsContent value="account">
                  <AccountSettings />
                </TabsContent>
                <TabsContent value="notifications">
                  <NotificationSettings />
                </TabsContent>
                <TabsContent value="appearance">
                  <AppearanceSettings />
                </TabsContent>
                <TabsContent value="privacy">
                  <PrivacySettings />
                </TabsContent>
              </div>
            </Tabs>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const ProfileSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>
            Update your profile information and public details
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Avatar Section */}
          <div className="flex items-center gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src="https://i.gyazo.com/098567d12767254bc632b8b14ad9e37d.png" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div className="flex gap-2">
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Image
                </Button>
                <Button variant="ghost">Remove</Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Recommended: Square JPG, PNG. Max 2MB.
              </p>
            </div>
          </div>

          <Separator />

          {/* Basic Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input id="fullName" defaultValue="John Developer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input id="username" defaultValue="johndeveloper" />
            </div>
            <div className="space-y-2 col-span-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                defaultValue="Senior Full-Stack Developer specializing in React, Node.js, and Cloud Architecture. Open source contributor and tech community mentor."
              />
            </div>
          </div>

          <Separator />

          {/* Professional Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Professional Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue="TechCorp Inc." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input id="role" defaultValue="Senior Full-Stack Developer" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input id="location" defaultValue="San Francisco, CA" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="education">Education</Label>
                <Input id="education" defaultValue="Computer Science, MIT" />
              </div>
            </div>
          </div>

          <Separator />

          {/* Social Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Social Links</h3>
            <div className="grid grid-cols-1 gap-4">
              <div className="flex items-center gap-2">
                <Github className="w-5 h-5" />
                <Input placeholder="GitHub profile URL" />
              </div>
              <div className="flex items-center gap-2">
                <Linkedin className="w-5 h-5" />
                <Input placeholder="LinkedIn profile URL" />
              </div>
              <div className="flex items-center gap-2">
                <Twitter className="w-5 h-5" />
                <Input placeholder="Twitter profile URL" />
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancel</Button>
            <Button>Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AccountSettings = () => {
  return (
    <div className="space-y-6">
      {/* Email Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Email Settings</CardTitle>
          <CardDescription>
            Manage your email addresses and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-medium">Primary Email</p>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span>john.developer@example.com</span>
                  <Badge>Primary</Badge>
                </div>
              </div>
              <Button variant="outline">Change</Button>
            </div>
            <Button variant="ghost" className="text-blue-500">
              + Add backup email
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Update your password and security settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="current">Current Password</Label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="new">New Password</Label>
            <Input id="new" type="password" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirm">Confirm New Password</Label>
            <Input id="confirm" type="password" />
          </div>
          <div className="flex justify-end">
            <Button>Update Password</Button>
          </div>
        </CardContent>
      </Card>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle>Two-Factor Authentication</CardTitle>
          <CardDescription>
            Add an extra layer of security to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Authenticator App</p>
              <p className="text-sm text-muted-foreground">
                Use an authenticator app to generate one-time codes
              </p>
            </div>
            <Button variant="outline">Setup</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">SMS Recovery</p>
              <p className="text-sm text-muted-foreground">
                Use your phone number as a backup
              </p>
            </div>
            <Button variant="outline">Add Phone</Button>
          </div>
        </CardContent>
      </Card>

      {/* Danger Zone */}
      <Card className="border-destructive/50">
        <CardHeader>
          <CardTitle className="text-destructive">Danger Zone</CardTitle>
          <CardDescription>
            Irreversible and destructive actions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">Delete Account</p>
              <p className="text-sm text-muted-foreground">
                Permanently delete your account and all data
              </p>
            </div>
            <Button variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const NotificationSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose what notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Email Notifications */}
          <div className="space-y-4">
            <h3 className="font-medium">Email Notifications</h3>
            {[
              {
                title: "Project Updates",
                description: "Get notified about updates to your projects",
              },
              {
                title: "Mentions",
                description: "Someone mentions you in a comment",
              },
              {
                title: "Learning Reminders",
                description: "Reminders about your learning goals",
              },
              {
                title: "Community Activity",
                description: "Updates from your community interactions",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <Switch />
              </div>
            ))}
          </div>

          <Separator />

          {/* Push Notifications */}
          <div className="space-y-4">
            <h3 className="font-medium">Push Notifications</h3>
            {[
              {
                title: "Direct Messages",
                description: "Get notified about new messages",
              },
              {
                title: "Project Invites",
                description: "Someone invites you to collaborate",
              },
              {
                title: "Session Reminders",
                description: "Upcoming learning session alerts",
              },
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <Switch />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AppearanceSettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize how DevCollab looks on your device
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Theme Selection */}
          <div className="space-y-4">
            <h3 className="font-medium">Theme</h3>
            <div className="grid grid-cols-3 gap-4">
              {["Light", "Dark", "System"].map((theme) => (
                <Button
                  key={theme}
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                >
                  {theme === "Light" && <Sun className="w-5 h-5" />}
                  {theme === "Dark" && <Moon className="w-5 h-5" />}
                  {theme === "System" && <Laptop className="w-5 h-5" />}
                  {theme}
                </Button>
              ))}
            </div>
          </div>

          <Separator />

          {/* Font Size */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">Font Size</h3>
                <p className="text-sm text-muted-foreground">
                  Adjust the font size of the interface
                </p>
              </div>
              <Select defaultValue="medium">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Separator />

          {/* Code Editor Theme */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="font-medium">Code Editor Theme</h3>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred code editor theme
                </p>
              </div>
              <Select defaultValue="github">
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="github">GitHub</SelectItem>
                  <SelectItem value="monokai">Monokai</SelectItem>
                  <SelectItem value="dracula">Dracula</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const PrivacySettings = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Settings</CardTitle>
          <CardDescription>
            Control your privacy and visibility settings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Profile Visibility */}
          <div className="space-y-4">
            <h3 className="font-medium">Profile Visibility</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Public Profile</p>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible to everyone
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Show Email Address</p>
                  <p className="text-sm text-muted-foreground">
                    Display your email to other users
                  </p>
                </div>
                <Switch />
              </div>
            </div>
          </div>

          <Separator />

          {/* Activity Privacy */}
          <div className="space-y-4">
            <h3 className="font-medium">Activity Privacy</h3>
            <div className="space-y-4">
              {[
                {
                  title: "Learning Progress",
                  description: "Show your learning progress to others",
                },
                {
                  title: "Project Contributions",
                  description: "Display your project contributions",
                },
                {
                  title: "Online Status",
                  description: "Show when you're online",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <Switch />
                </div>
              ))}
            </div>
          </div>

          <Separator />

          {/* Data Usage */}
          <div className="space-y-4">
            <h3 className="font-medium">Data Usage</h3>
            <div className="space-y-4">
              {[
                {
                  title: "Analytics",
                  description: "Help improve DevCollab with usage data",
                },
                {
                  title: "Personalization",
                  description: "Allow personalized recommendations",
                },
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="space-y-1">
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                  <Switch />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
