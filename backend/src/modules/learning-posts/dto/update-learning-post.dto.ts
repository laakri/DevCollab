import { PartialType } from '@nestjs/mapped-types';
import { CreateLearningPostDto } from './create-learning-post.dto';

export class UpdateLearningPostDto extends PartialType(CreateLearningPostDto) {}
