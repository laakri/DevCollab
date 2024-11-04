import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
  Request,
} from '@nestjs/common';
import { LearningPostsService } from './learning-posts.service';
import { CreateLearningPostDto } from './dto/create-learning-post.dto';
import { UpdateLearningPostDto } from './dto/update-learning-post.dto';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller('learning-posts')
@UseGuards(JwtAuthGuard) // Protect all routes by default
export class LearningPostsController {
  constructor(private readonly learningPostsService: LearningPostsService) {}

  @Post()
  create(@Body() createLearningPostDto: CreateLearningPostDto, @Request() req) {
    return this.learningPostsService.create(createLearningPostDto, req.user);
  }

  @Get()
  findAll(@Query('interests') interests?: string) {
    if (interests) {
      const interestArray = interests.split(',');
      return this.learningPostsService.findByInterests(interestArray);
    }
    return this.learningPostsService.findAll();
  }

  @Get('my-posts')
  findMyPosts(@Request() req) {
    return this.learningPostsService.findByUser(req.user.id);
  }

  @Get('matches')
  findMatches(@Request() req) {
    return this.learningPostsService.findMatches(req.user);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.learningPostsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateLearningPostDto: UpdateLearningPostDto,
    @Request() req,
  ) {
    return this.learningPostsService.update(
      id,
      updateLearningPostDto,
      req.user,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.learningPostsService.remove(id, req.user);
  }
}
