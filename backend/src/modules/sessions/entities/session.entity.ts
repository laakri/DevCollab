import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Session {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  scheduledAt: Date;

  @Column()
  duration: number;

  @Column({
    type: 'enum',
    enum: ['SCHEDULED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'],
    default: 'SCHEDULED',
  })
  status: string;

  @Column()
  topic: string;

  @Column('text')
  description: string;

  @ManyToOne(() => User, (user) => user.hostedSessions)
  host: User;

  @ManyToOne(() => User, (user) => user.participatingSessions)
  participant: User;
}
