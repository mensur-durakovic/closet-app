import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import LookEntity from './Look';
import ClosetItemEntity from './ClosetItem';

@Entity({ schema: 'ClosetApp', name: 'ClosetItemLook' })
export default class ClosetItemLookEntity {
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
    () => LookEntity,
    look => look.lookTag,
  )
  @Column({ name: 'look_id', type: 'integer' })
  look: LookEntity;
}
