import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Controller('sessions')
export class SessionsController {
  constructor(private readonly sessionsService: SessionsService) {}

  @Post()
  create(@Body() createSessionDto: CreateSessionDto) {
    return this.sessionsService.create(createSessionDto);
  }

  @Get()
  findAll() {
    return this.sessionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(id, updateSessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sessionsService.remove(id);
  }

  @Get('status')
  findByStatus(@Query('status') status: string) {
    return this.sessionsService.findByStatus(status);
  }

  @Get('host/:hostId')
  findByHostUserId(@Param('hostId') hostId: string) {
    return this.sessionsService.findByHostUserId(hostId);
  }

  @Get('participant/:participantId')
  findByParticipantUserId(@Param('participantId') participantId: string) {
    return this.sessionsService.findByParticipantUserId(participantId);
  }
}
