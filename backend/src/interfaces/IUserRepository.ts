import { IUser, IUserEditDTO } from './IUser';
import IBaseRepository from './IBaseRepository';

export default interface IUserRepository extends IBaseRepository<IUser, IUserEditDTO> {
  findByEmail(userEmail: string): Promise<IUser | null>;
}
