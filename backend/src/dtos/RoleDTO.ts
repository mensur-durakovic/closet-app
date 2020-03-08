import RoleEntity from '../entities/Role';
import Roles from '../constants/roles';

export default class RoleDTO implements Readonly<RoleDTO> {
  id?: number;
  createdAt?: Date;
  name: Roles;
  updatedAt?: Date;

  public static from(dto: Partial<RoleDTO>) {
    const role = new RoleDTO();
    role.id = dto?.id;
    role.createdAt = dto?.createdAt;
    role.name = dto?.name;
    role.updatedAt = dto?.updatedAt;
    return role;
  }

  public static fromEntity(entity: RoleEntity) {
    if (!entity) return null;
    return this.from({
      id: entity?.id,
      createdAt: entity?.createdAt,
      name: entity?.name,
      updatedAt: entity?.updatedAt,
    });
  }

  public toEntity() {
    const it = new RoleEntity();
    it.id = this.id;
    it.createdAt = this.createdAt;
    it.name = this.name;
    it.updatedAt = this.updatedAt;
    return it;
  }
}
