import { ITag } from '../interfaces/ITag';
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

import ClosetItemTagEntity from './ClosetItemTag';
import LookTagEntity from './LookTag';

@Entity({ schema: 'ClosetApp', name: 'Tag' })
export default class TagEntity implements ITag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  color: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ type: 'text' })
  name: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp without time zone' })
  updatedAt: Date;

  @OneToMany(
    () => LookTagEntity,
    lookTag => lookTag.tag,
  )
  lookTag: LookTagEntity[];

  @OneToMany(
    () => ClosetItemTagEntity,
    closetItemTag => closetItemTag.tag,
  )
  closetItemTag: ClosetItemTagEntity[];
}
