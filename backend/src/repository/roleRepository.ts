import IRoleRepository from './../interfaces/IRoleRepository';
import RoleDTO from './../dtos/RoleDTO';
import { getManager } from 'typeorm';
import { IUser } from '../interfaces/IUser';
import Roles from '../constants/roles';
import RoleEntity from '../entities/Role';
import { Service } from 'typedi';

@Service()
class RoleRepository implements IRoleRepository {
  public async getAll(): Promise<RoleDTO[]> {
    const allRoles = await getManager()
      .getRepository(RoleEntity)
      .find();
    return allRoles.map((role: RoleEntity) => RoleDTO.fromEntity(role));
  }

  public async save(roleData: IUser): Promise<RoleDTO | null> {
    const role = await getManager()
      .getRepository(RoleEntity)
      .save(roleData);
    return RoleDTO.fromEntity(role);
  }

  public async findByRoleName(roleName: Roles): Promise<RoleDTO | null> {
    const user = await getManager()
      .getRepository(RoleEntity)
      .createQueryBuilder('role')
      .select()
      .where('role.name = :roleName', { roleName })
      .getOne();
    return RoleDTO.fromEntity(user);
  }
}

export default RoleRepository;
