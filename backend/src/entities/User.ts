import { IRole } from './../interfaces/IRole';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IUser } from '../interfaces/IUser';

import Gender from '../constants/gender';
import RoleEntity from './Role';

@Entity({ schema: 'ClosetApp', name: 'User' })
export default class UserEntity implements IUser {
  @PrimaryGeneratedColumn()
  id?: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt?: Date;

  @Column({ name: 'date_of_birth', type: 'timestamp without time zone', nullable: true })
  dateOfBirth?: Date;

  @Column({ type: 'text', unique: true })
  email?: string;

  @Column({ type: 'enum', enum: Gender, default: Gender.OTHER })
  gender?: Gender;

  @Column({ name: 'favourite_quote', type: 'text', nullable: true })
  favouriteQuote?: string;

  @Column({ name: 'first_name', type: 'text', nullable: true })
  firstName?: string;

  @Column({ name: 'last_name', type: 'text', nullable: true })
  lastName?: string;

  @Column({ type: 'text' })
  password?: string;

  @Column({ type: 'text' })
  salt?: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp without time zone' })
  updatedAt?: Date;

  @OneToOne(() => RoleEntity)
  @JoinColumn()
  role?: IRole;
}
