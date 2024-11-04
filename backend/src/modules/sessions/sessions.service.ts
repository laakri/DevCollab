import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionRepository: Repository<Session>,
  ) {}

  async create(createSessionDto: CreateSessionDto): Promise<Session> {
    const session = this.sessionRepository.create(createSessionDto);
    return this.sessionRepository.save(session);
  }

  async findAll(): Promise<Session[]> {
    return this.sessionRepository.find({ relations: ['host', 'participant'] });
  }

  async findOne(id: string): Promise<Session> {
    const session = await this.sessionRepository.findOne({
      where: { id },
      relations: ['host', 'participant'],
    });
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    return session;
  }

  async update(
    id: string,
    updateSessionDto: UpdateSessionDto,
  ): Promise<Session> {
    const session = await this.sessionRepository.preload({
      id: id,
      ...updateSessionDto,
    });
    if (!session) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
    return this.sessionRepository.save(session);
  }

  async remove(id: string): Promise<void> {
    const result = await this.sessionRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Session with ID ${id} not found`);
    }
  }

  async findByStatus(status: string): Promise<Session[]> {
    return this.sessionRepository.find({
      where: { status },
      relations: ['host', 'participant'],
    });
  }

  async findByHostUserId(hostUserId: string): Promise<Session[]> {
    return this.sessionRepository.find({
      where: { host: { id: hostUserId } },
      relations: ['host', 'participant'],
    });
  }

  async findByParticipantUserId(participantUserId: string): Promise<Session[]> {
    return this.sessionRepository.find({
      where: { participant: { id: participantUserId } },
      relations: ['host', 'participant'],
    });
  }
}
