import { useEffect, useState } from "react";
import { useProfileStore } from "@/stores/useProfileStore";
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
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Lock,
  Bell,
  Palette,
  Shield,
  Trash2,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Profile } from "@/types/settings";
import { SkillsSelect } from "@/components/SkillsSelect";

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
  const { profile, loading, error, fetchProfile, updateProfile } =
    useProfileStore();
  const [localProfile, setLocalProfile] = useState<Profile | null>(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setLocalProfile(profile);
    }
  }, [profile]);

  const handleSkillsChange = (skills: string[]) => {
    if (localProfile) {
      setLocalProfile({ ...localProfile, skills });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      fullName: formData.get("fullName"),
      username: formData.get("username"),
      bio: formData.get("bio"),
      company: formData.get("company"),
      location: formData.get("location"),
      education: formData.get("education"),
      githubUrl: formData.get("githubUrl"),
      linkedinUrl: formData.get("linkedinUrl"),
      twitterUrl: formData.get("twitterUrl"),
      skills: localProfile?.skills || [],
      interests: localProfile?.interests || [],
    };

    try {
      await updateProfile(data as Partial<Profile>);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Profile Information</CardTitle>
          <CardDescription>Update your profile information</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  name="fullName"
                  defaultValue={profile?.fullName || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  defaultValue={profile?.username || ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" defaultValue={profile?.bio || ""} />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  name="company"
                  defaultValue={profile?.company || ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={profile?.location || ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                name="education"
                defaultValue={profile?.education || ""}
              />
            </div>

            <div className="space-y-2">
              <Label>Skills</Label>
              <SkillsSelect
                selectedSkills={localProfile?.skills || []}
                onSkillsChange={handleSkillsChange}
              />
            </div>

            <div className="space-y-4">
              <Label>Social Links</Label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Github className="w-4 h-4" />
                  <Input
                    name="githubUrl"
                    defaultValue={profile?.githubUrl || ""}
                    placeholder="GitHub URL"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Linkedin className="w-4 h-4" />
                  <Input
                    name="linkedinUrl"
                    defaultValue={profile?.linkedinUrl || ""}
                    placeholder="LinkedIn URL"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Twitter className="w-4 h-4" />
                  <Input
                    name="twitterUrl"
                    defaultValue={profile?.twitterUrl || ""}
                    placeholder="Twitter URL"
                  />
                </div>
              </div>
            </div>

            <Button type="submit">Save Changes</Button>
          </form>
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
  const { settings, loading, error, fetchSettings, updateSettings } =
    useProfileStore();

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleToggle = async (key: string, value: boolean) => {
    await updateSettings({
      notificationPreferences: {
        ...settings?.notificationPreferences,
        [key]: value,
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Manage your notification settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {[
              {
                key: "learningReminders",
                title: "Learning Reminders",
                description: "Get reminders about your learning goals",
              },
              {
                key: "communityActivity",
                title: "Community Activity",
                description: "Updates about community posts and discussions",
              },
              {
                key: "directMessages",
                title: "Direct Messages",
                description: "Receive notifications for direct messages",
              },
              {
                key: "projectInvites",
                title: "Project Invites",
                description: "Get notified about project collaboration invites",
              },
              {
                key: "sessionReminders",
                title: "Session Reminders",
                description: "Reminders for upcoming learning sessions",
              },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
                <Switch
                  checked={
                    settings?.notificationPreferences?.[item.key] || false
                  }
                  onCheckedChange={(checked) => handleToggle(item.key, checked)}
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const AppearanceSettings = () => {
  const { settings, loading, error, fetchSettings, updateSettings } =
    useProfileStore();

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = async (key: string, value: string) => {
    await updateSettings({
      appearanceSettings: {
        ...settings?.appearanceSettings,
        [key]: value,
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Appearance Settings</CardTitle>
          <CardDescription>
            Customize your interface preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Theme</Label>
              <Select
                value={settings?.appearanceSettings?.theme || "system"}
                onValueChange={(value) => handleChange("theme", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                  <SelectItem value="dark">Dark</SelectItem>
                  <SelectItem value="system">System</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Font Size</Label>
              <Select
                value={settings?.appearanceSettings?.fontSize || "medium"}
                onValueChange={(value) => handleChange("fontSize", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select font size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="small">Small</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="large">Large</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Code Editor Theme</Label>
              <Select
                value={
                  settings?.appearanceSettings?.codeEditorTheme || "github"
                }
                onValueChange={(value) =>
                  handleChange("codeEditorTheme", value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select editor theme" />
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
  const { settings, loading, error, fetchSettings, updateSettings } =
    useProfileStore();

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleToggle = async (key: string, value: boolean) => {
    await updateSettings({
      privacySettings: {
        ...settings?.privacySettings,
        [key]: value,
      },
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

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
                <Switch
                  checked={settings?.privacySettings?.publicProfile || false}
                  onCheckedChange={(checked) =>
                    handleToggle("publicProfile", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Show Email Address</p>
                  <p className="text-sm text-muted-foreground">
                    Display your email to other users
                  </p>
                </div>
                <Switch
                  checked={settings?.privacySettings?.showEmail || false}
                  onCheckedChange={(checked) =>
                    handleToggle("showEmail", checked)
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Activity Privacy */}
          <div className="space-y-4">
            <h3 className="font-medium">Activity Privacy</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Learning Progress</p>
                  <p className="text-sm text-muted-foreground">
                    Show your learning progress to others
                  </p>
                </div>
                <Switch
                  checked={
                    settings?.privacySettings?.showLearningProgress || false
                  }
                  onCheckedChange={(checked) =>
                    handleToggle("showLearningProgress", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Online Status</p>
                  <p className="text-sm text-muted-foreground">
                    Show when you're online
                  </p>
                </div>
                <Switch
                  checked={settings?.privacySettings?.showOnlineStatus || false}
                  onCheckedChange={(checked) =>
                    handleToggle("showOnlineStatus", checked)
                  }
                />
              </div>
            </div>
          </div>

          <Separator />

          {/* Data Usage */}
          <div className="space-y-4">
            <h3 className="font-medium">Data Usage</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Analytics</p>
                  <p className="text-sm text-muted-foreground">
                    Help improve DevCollab with usage data
                  </p>
                </div>
                <Switch
                  checked={settings?.privacySettings?.allowAnalytics || false}
                  onCheckedChange={(checked) =>
                    handleToggle("allowAnalytics", checked)
                  }
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="font-medium">Personalization</p>
                  <p className="text-sm text-muted-foreground">
                    Allow personalized recommendations
                  </p>
                </div>
                <Switch
                  checked={
                    settings?.privacySettings?.allowPersonalization || false
                  }
                  onCheckedChange={(checked) =>
                    handleToggle("allowPersonalization", checked)
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SettingsPage;
