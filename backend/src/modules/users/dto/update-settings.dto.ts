import { IsObject, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class NotificationPreferencesDto {
  learningReminders: boolean;
  communityActivity: boolean;
  directMessages: boolean;
  projectInvites: boolean;
  sessionReminders: boolean;
}

class AppearanceSettingsDto {
  theme: string;
  fontSize: string;
  codeEditorTheme: string;
}

class PrivacySettingsDto {
  publicProfile: boolean;
  showEmail: boolean;
  showLearningProgress: boolean;
  showOnlineStatus: boolean;
  allowAnalytics: boolean;
  allowPersonalization: boolean;
}

export class UpdateSettingsDto {
  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => NotificationPreferencesDto)
  notificationPreferences?: NotificationPreferencesDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => AppearanceSettingsDto)
  appearanceSettings?: AppearanceSettingsDto;

  @IsOptional()
  @IsObject()
  @ValidateNested()
  @Type(() => PrivacySettingsDto)
  privacySettings?: PrivacySettingsDto;
}
