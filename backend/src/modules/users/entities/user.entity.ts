import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
import { Session } from '../../sessions/entities/session.entity';
import { LearningPost } from '../../learning-posts/entities/learning-post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  @Exclude()
  password: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ type: 'json', nullable: true })
  skills: string[];

  @Column({ type: 'json', nullable: true })
  interests: string[];

  @Column({ default: false })
  isEmailVerified: boolean;

  @Column({ default: 'user' })
  role: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(() => Session, (session) => session.host)
  hostedSessions: Session[];

  @OneToMany(() => Session, (session) => session.participant)
  participatingSessions: Session[];

  @OneToMany(() => LearningPost, (learningPost) => learningPost.user)
  learningPosts: LearningPost[];

  // Notification Settings
  @Column({
    type: 'json',
    default: {
      learningReminders: true,
      communityActivity: true,
      directMessages: true,
      projectInvites: true,
      sessionReminders: true,
    },
  })
  notificationPreferences: {
    learningReminders: boolean;
    communityActivity: boolean;
    directMessages: boolean;
    projectInvites: boolean;
    sessionReminders: boolean;
  };

  // Appearance Settings
  @Column({
    type: 'json',
    default: {
      theme: 'system',
      fontSize: 'medium',
      codeEditorTheme: 'github',
    },
  })
  appearanceSettings: {
    theme: string;
    fontSize: string;
    codeEditorTheme: string;
  };

  // Privacy Settings
  @Column({
    type: 'json',
    default: {
      publicProfile: true,
      showEmail: false,
      showLearningProgress: true,
      showOnlineStatus: true,
      allowAnalytics: true,
      allowPersonalization: true,
    },
  })
  privacySettings: {
    publicProfile: boolean;
    showEmail: boolean;
    showLearningProgress: boolean;
    showOnlineStatus: boolean;
    allowAnalytics: boolean;
    allowPersonalization: boolean;
  };

  @Column({ nullable: true })
  bio: string;

  @Column({ nullable: true })
  company: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  education: string;

  @Column({ nullable: true })
  githubUrl: string;

  @Column({ nullable: true })
  linkedinUrl: string;

  @Column({ nullable: true })
  twitterUrl: string;

  @BeforeInsert()
  async hashPassword() {
    if (this.password) {
      const salt = await bcrypt.genSalt();
      this.password = await bcrypt.hash(this.password, salt);
    }
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
