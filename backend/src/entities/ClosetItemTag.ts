import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import ClosetItemEntity from './ClosetItem';
import TagEntity from './Tag';

@Entity({ schema: 'ClosetApp', name: 'ClosetItem' })
export default class ClosetItemTagEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @ManyToOne(
    () => ClosetItemEntity,
    closetItem => closetItem.closetItemTag,
  )
  @Column({ name: 'closet_item_id', type: 'integer' })
  closetItem: ClosetItemEntity;

  @ManyToOne(
    () => TagEntity,
    tag => tag.lookTag,
  )
  @Column({ name: 'tag_id', type: 'integer' })
  tag: TagEntity;
}
