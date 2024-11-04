import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { LearningPost } from './entities/learning-post.entity';
import { CreateLearningPostDto } from './dto/create-learning-post.dto';
import { UpdateLearningPostDto } from './dto/update-learning-post.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class LearningPostsService {
  constructor(
    @InjectRepository(LearningPost)
    private readonly learningPostRepository: Repository<LearningPost>,
  ) {}

  async create(createLearningPostDto: CreateLearningPostDto, user: User) {
    const learningPost = this.learningPostRepository.create({
      ...createLearningPostDto,
      user,
    });
    return this.learningPostRepository.save(learningPost);
  }

  async findAll() {
    return this.learningPostRepository.find({
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByUser(userId: string) {
    return this.learningPostRepository.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const post = await this.learningPostRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!post) {
      throw new NotFoundException(`Learning post with ID ${id} not found`);
    }
    return post;
  }

  async update(
    id: string,
    updateLearningPostDto: UpdateLearningPostDto,
    user: User,
  ) {
    const post = await this.findOne(id);
    if (post.user.id !== user.id) {
      throw new ForbiddenException('You can only update your own posts');
    }
    await this.learningPostRepository.update(id, updateLearningPostDto);
    return this.findOne(id);
  }

  async remove(id: string, user: User) {
    const post = await this.findOne(id);
    if (post.user.id !== user.id) {
      throw new ForbiddenException('You can only delete your own posts');
    }
    await this.learningPostRepository.delete(id);
  }

  async findByInterests(interests: string[]) {
    return this.learningPostRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.teachingInterests && ARRAY[:...interests]', { interests })
      .orWhere('post.learningInterests && ARRAY[:...interests]', { interests })
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }

  async findMatches(user: User) {
    // Find posts where:
    // 1. User's learning interests match others' teaching interests
    // 2. User's teaching interests match others' learning interests
    // 3. Exclude user's own posts
    return this.learningPostRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .where('post.user.id != :userId', { userId: user.id })
      .andWhere(
        '(post.teachingInterests && ARRAY[:...learningInterests] OR post.learningInterests && ARRAY[:...teachingInterests])',
        {
          learningInterests: user.interests || [],
          teachingInterests: user.skills || [],
        },
      )
      .orderBy('post.createdAt', 'DESC')
      .getMany();
  }
}
