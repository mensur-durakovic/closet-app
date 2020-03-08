import ClosetItem from '../entities/ClosetItem';
import ClosetItemCategories from '../constants/closetItemCategories';
import { ITag } from '../interfaces/ITag';

export default class ClosetItemDTO implements Readonly<ClosetItemDTO> {
  id?: number;
  createdAt?: Date;
  category: ClosetItemCategories;
  imageUrl: string;
  updatedAt?: Date;
  tag?: ITag;

  public static from(dto: Partial<ClosetItemDTO>) {
    const closetItem = new ClosetItemDTO();
    closetItem.id = dto?.id;
    closetItem.createdAt = dto?.createdAt;
    closetItem.category = dto?.category;
    closetItem.imageUrl = dto?.imageUrl;
    closetItem.updatedAt = dto?.updatedAt;
    closetItem.tag = dto?.tag;
    return closetItem;
  }

  public static fromEntity(entity: ClosetItem) {
    if (!entity) return null;
    return this.from({
      ...(entity?.id && { id: entity?.id }),
      ...(entity?.category && { category: entity?.category }),
      ...(entity?.createdAt && { createdAt: entity?.createdAt }),
      ...(entity?.imageUrl && { imageUrl: entity?.imageUrl }),
      ...(entity?.updatedAt && { updatedAt: entity?.updatedAt }),
    });
  }

  public toEntity() {
    const it = new ClosetItem();
    it.id = this.id;
    it.createdAt = this.createdAt;
    it.category = this.category;
    it.imageUrl = this.imageUrl;
    it.updatedAt = this.updatedAt;
    return it;
  }
}
