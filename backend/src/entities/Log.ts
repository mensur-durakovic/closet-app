import { Column, CreateDateColumn, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import ApplicationEvents from '../constants/events';
import UserEntity from './User';

@Entity({ schema: 'ClosetApp', name: 'Log' })
export default class LogEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ name: 'log_text', type: 'text' })
  logText: ApplicationEvents;

  @OneToOne(() => UserEntity)
  @JoinColumn()
  user: UserEntity;
}
