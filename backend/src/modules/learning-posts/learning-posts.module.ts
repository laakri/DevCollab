import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LearningPost } from './entities/learning-post.entity';
import { LearningPostsService } from './learning-posts.service';
import { LearningPostsController } from './learning-posts.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([LearningPost]),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: config.get<string>('JWT_EXPIRES_IN') },
      }),
    }),
  ],
  providers: [LearningPostsService],
  controllers: [LearningPostsController],
  exports: [LearningPostsService],
})
export class LearningPostsModule {}
