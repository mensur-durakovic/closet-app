import { IRole } from './../interfaces/IRole';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Roles from '../constants/roles';

@Entity({ schema: 'ClosetApp', name: 'Role' })
export default class RoleEntity implements IRole{
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  name: Roles;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp without time zone' })
  updatedAt: Date;
}
