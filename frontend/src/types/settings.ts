export interface Profile {
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
