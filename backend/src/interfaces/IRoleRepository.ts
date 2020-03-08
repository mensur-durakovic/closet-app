import { IRole } from './IRole';
import RoleDTO from '../dtos/RoleDTO';

export default interface IRoleRepository {
  getAll?(): Promise<RoleDTO[]>;
  save?(roleData: IRole): Promise<RoleDTO | null>;
  findByRoleName?(roleName: string): Promise<RoleDTO | null>;
}
