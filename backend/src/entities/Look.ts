import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import ClosetItemLookEntity from './ClosetItemLook';
import LookTagEntity from './LookTag';

@Entity({ schema: 'ClosetApp', name: 'Look' })
export default class LookEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ type: 'text' })
  name: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp without time zone' })
  updatedAt: Date;

  @OneToMany(
    () => LookTagEntity,
    lookTag => lookTag.look,
  )
  lookTag: LookTagEntity[];

  @OneToMany(
    () => ClosetItemLookEntity,
    closetItemLook => closetItemLook.look,
  )
  closetItemLook: ClosetItemLookEntity[];
}
