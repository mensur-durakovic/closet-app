import TagEntity from '../entities/Tag';

export default class TagDTO implements Readonly<TagDTO> {
  id?: number;
  color?: string;
  createdAt?: Date;
  name?: string;
  updatedAt?: Date;

  public static from(dto: Partial<TagDTO>) {
    const tag = new TagDTO();
    tag.id = dto?.id;
    tag.color = dto?.color;
    tag.createdAt = dto?.createdAt;
    tag.name = dto?.name;
    tag.updatedAt = dto?.updatedAt;
    return tag;
  }

  public static fromEntity(entity: TagEntity) {
    if (!entity) return null;
    return this.from({
      ...(entity?.id && { id: entity?.id }),
      ...(entity?.color && { color: entity?.color }),
      ...(entity?.createdAt && { createdAt: entity?.createdAt }),
      ...(entity?.name && { name: entity?.name }),
      ...(entity?.updatedAt && { updatedAt: entity?.updatedAt }),
    });
  }

  public toEntity() {
    const it = new TagEntity();
    it.id = this.id;
    it.color = this.color;
    it.createdAt = this.createdAt;
    it.name = this.name;
    it.updatedAt = this.updatedAt;
    return it;
  }
}
