import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import LookEntity from './Look';
import TagEntity from './Tag';

@Entity({ schema: 'ClosetApp', name: 'LookTag' })
export default class LookTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @ManyToOne(
    () => LookEntity,
    look => look.lookTag,
  )
  @Column({ name: 'look_id', type: 'integer' })
  look: LookEntity;

  @ManyToOne(
    () => TagEntity,
    tag => tag.lookTag,
  )
  @Column({ name: 'tag_id', type: 'integer' })
  tag: TagEntity;
}
