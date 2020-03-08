import IUserRepository from './../interfaces/IUserRepository';
import UserEntity from '../entities/User';
import { getManager } from 'typeorm';
import { IUser, IUserEditDTO } from '../interfaces/IUser';
import Container, { Service } from 'typedi';
import IRoleRepository from '../interfaces/IRoleRepository';
import Roles from '../constants/roles';

@Service()
class UserRepository implements IUserRepository {
  public async getAll(): Promise<IUser[]> {
    const allUsers = await getManager()
      .getRepository(UserEntity)
      .find();
    return allUsers;
  }

  public async save(userData: IUser): Promise<IUser | null> {
    const roleRepository: IRoleRepository = Container.get('roleRepository');
    const roleName = userData?.role ? userData.role.name : Roles.USER;
    const userRole = await roleRepository.findByRoleName(roleName);
    const userDataWithRole = {
      ...userData,
      role: userRole,
    };

    const user = await getManager()
      .getRepository(UserEntity)
      .save(userDataWithRole);
    return user;
  }

  public async edit(id: number, entityData: IUserEditDTO): Promise<IUser | null> {
    await getManager()
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .update(UserEntity)
      .set(entityData)
      .where('user.id = :id', { id })
      .execute();
    const updatedUser = await this.findById(id);
    return updatedUser;
  }

  public async delete(id: number): Promise<null> {
    await getManager()
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .delete()
      .where('user.id = :id', { id })
      .execute();
    return null;
  }

  public async findById(id: number): Promise<IUser | null> {
    const user = await getManager()
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .select()
      .where('user.id = :id', { id })
      .getOne();
    return user;
  }

  public async findByEmail(email: string): Promise<IUser | null> {
    const user = await getManager()
      .getRepository(UserEntity)
      .createQueryBuilder('user')
      .select()
      .where('user.email = :email', { email })
      .getOne();
    return user;
  }
}

export default UserRepository;
