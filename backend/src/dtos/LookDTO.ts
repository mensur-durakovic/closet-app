import LookEntity from '../entities/Look';

export default class LookDTO implements Readonly<LookDTO> {
  id?: number;
  createdAt?: Date;
  name: string;
  updatedAt?: Date;

  public static from(dto: Partial<LookDTO>) {
    const look = new LookDTO();
    look.id = dto?.id;
    look.createdAt = dto?.createdAt;
    look.name = dto?.name;
    look.updatedAt = dto?.updatedAt;
    return look;
  }

  public static fromEntity(entity: LookEntity) {
    if (!entity) return null;
    return this.from({
      ...(entity?.id && { id: entity?.id }),
      ...(entity?.createdAt && { createdAt: entity?.createdAt }),
      ...(entity?.name && { name: entity?.name }),
      ...(entity?.updatedAt && { updatedAt: entity?.updatedAt }),
    });
  }

  public toEntity() {
    const it = new LookEntity();
    it.id = this.id;
    it.createdAt = this.createdAt;
    it.name = this.name;
    it.updatedAt = this.updatedAt;
    return it;
  }
}
