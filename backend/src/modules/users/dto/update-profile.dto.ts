import { IsString, IsOptional, IsArray, IsUrl } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsString()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  bio?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  location?: string;

  @IsString()
  @IsOptional()
  education?: string;

  @IsString()
  @IsOptional()
  @IsUrl({ require_protocol: true, allow_underscores: true })
  @IsOptional()
  githubUrl?: string;

  @IsString()
  @IsOptional()
  @IsUrl({ require_protocol: true, allow_underscores: true })
  @IsOptional()
  linkedinUrl?: string;

  @IsString()
  @IsOptional()
  @IsUrl({ require_protocol: true, allow_underscores: true })
  @IsOptional()
  twitterUrl?: string;

  @IsArray()
  @IsOptional()
  skills?: string[];

  @IsArray()
  @IsOptional()
  interests?: string[];
}
