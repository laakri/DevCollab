import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class LearningPost {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  content: string;

  @Column('simple-array')
  learningInterests: string[];

  @Column('simple-array')
  teachingInterests: string[];

  @Column({ nullable: true })
  availability: string;

  @Column({ nullable: true })
  preferredLanguages: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.learningPosts)
  user: User;
}
