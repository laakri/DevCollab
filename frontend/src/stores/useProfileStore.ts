import { create } from "zustand";
import { profileService } from "@/services/profileService";
import { Profile, Settings } from "@/types/settings";

interface ProfileState {
  profile: Profile | null;
  settings: Settings | null;
  loading: boolean;
  error: string | null;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<Profile>) => Promise<void>;
  fetchSettings: () => Promise<void>;
  updateSettings: (data: Partial<Settings>) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set) => ({
  profile: null,
  settings: null,
  loading: false,
  error: null,

  fetchProfile: async () => {
    set({ loading: true, error: null });
    try {
      const profile = await profileService.getProfile();
      set({ profile, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateProfile: async (data) => {
    set({ loading: true, error: null });
    try {
      const updatedProfile = await profileService.updateProfile(data);
      set({ profile: updatedProfile, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchSettings: async () => {
    set({ loading: true, error: null });
    try {
      const settings = await profileService.getSettings();
      set({ settings, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateSettings: async (data) => {
    set({ loading: true, error: null });
    try {
      const updatedSettings = await profileService.updateSettings(data);
      set({ settings: updatedSettings, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
}));
