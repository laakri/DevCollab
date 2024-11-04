import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateLearningPostDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsArray()
  @IsString({ each: true })
  learningInterests: string[];

  @IsArray()
  @IsString({ each: true })
  teachingInterests: string[];

  @IsString()
  @IsOptional()
  availability?: string;

  @IsString()
  @IsOptional()
  preferredLanguages?: string;
}
