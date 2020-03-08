import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { IClosetItem } from '../interfaces/IClosetItem';

import ClosetItemCategories from '../constants/closetItemCategories';
import ClosetItemLookEntity from './ClosetItemLook';
import ClosetItemTagEntity from './ClosetItemTag';

@Entity({ schema: 'ClosetApp', name: 'ClosetItem' })
export default class ClosetItemEntity implements IClosetItem {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: ClosetItemCategories, default: ClosetItemCategories.OTHER })
  category: ClosetItemCategories;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp without time zone' })
  createdAt: Date;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  imageUrl: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp without time zone' })
  updatedAt: Date;

  @OneToMany(
    () => ClosetItemTagEntity,
    closetItemTag => closetItemTag.closetItem,
  )
  closetItemTag: ClosetItemTagEntity[];

  @OneToMany(
    () => ClosetItemLookEntity,
    closetItemLook => closetItemLook.closetItem,
  )
  closetItemLook: ClosetItemLookEntity[];
}
