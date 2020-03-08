import { IRole } from './../interfaces/IRole';
import Gender from '../constants/gender';
import UserEntity from '../entities/User';
import RoleEntity from '../entities/Role';

export default class UserDTO implements Readonly<UserDTO> {
  id?: number;
  createdAt?: Date;
  dateOfBirth?: Date;
  email?: string;
  gender?: Gender;
  favouriteQuote?: string;
  firstName?: string;
  lastName?: string;
  updatedAt?: Date;
  password?: string;
  salt?: string;
  role?: IRole;

  public static from(dto: Partial<UserDTO>) {
    const user = new UserDTO();
    user.id = dto?.id;
    user.createdAt = dto?.createdAt;
    user.dateOfBirth = dto?.dateOfBirth;
    user.gender = dto?.gender;
    user.favouriteQuote = dto?.favouriteQuote;
    user.firstName = dto?.firstName;
    user.lastName = dto?.lastName;
    user.updatedAt = dto?.updatedAt;
    user.role = { name: dto?.role.name };
    return user;
  }

  public static fromEntity(entity: UserEntity) {
    if (!entity) return null;
    return this.from({
      ...(entity?.id && { id: entity?.id }),
      ...(entity?.createdAt && { createdAt: entity?.createdAt }),
      ...(entity?.dateOfBirth && { dateOfBirth: entity?.dateOfBirth }),
      ...(entity?.gender && { gender: entity?.gender }),
      ...(entity?.favouriteQuote && { favouriteQuote: entity?.favouriteQuote }),
      ...(entity?.firstName && { firstName: entity?.firstName }),
      ...(entity?.lastName && { lastName: entity?.lastName }),
      ...(entity?.updatedAt && { updatedAt: entity?.updatedAt }),
      ...(entity?.role && { role: entity?.role }),
    });
  }

  public toEntity(role: RoleEntity = null) {
    const it = new UserEntity();
    it.id = this.id;
    it.createdAt = this.createdAt;
    it.dateOfBirth = this.dateOfBirth;
    it.gender = this.gender;
    it.favouriteQuote = this.favouriteQuote;
    it.firstName = this.firstName;
    it.lastName = this.lastName;
    it.lastName = this.lastName;
    it.updatedAt = this.updatedAt;
    it.role = role ? role : null;
    return it;
  }
}
