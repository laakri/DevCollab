import { IsDate, IsEnum, IsString, IsUUID } from 'class-validator';

export class CreateSessionDto {
  @IsDate()
  scheduledAt: Date;

  @IsString()
  topic: string;

  @IsUUID()
  hostId: string;

  @IsUUID()
  participantId: string;
}
