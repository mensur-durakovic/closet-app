import { Service, Inject } from 'typedi';
import { IUser, IUserEditDTO } from '../interfaces/IUser';
import IUserRepository from '../interfaces/IUserRepository';
import UserDTO from '../dtos/UserDTO';

@Service()
export default class UserService {
  constructor(@Inject('userRepository') private userRepository: IUserRepository) {}

  public async edit(id: number, userData: IUserEditDTO) {
    const userExists = await this.userRepository.findById(id);
    if (!userExists) {
      throw new Error('User does not exist!');
    }

    const updatedUser = await this.userRepository.edit(id, userData);
    return { payload: UserDTO.fromEntity(updatedUser), status: 'ok' };
  }

  public StartEmailSequence(sequence: string, user: Partial<IUser>) {
    if (!user.email) {
      throw new Error('No email provided');
    }
    // @TODO Add example of an email sequence implementation
    // Something like
    // 1 - Send first email of the sequence
    // 2 - Save the step of the sequence in database
    // 3 - Schedule job for second email in 1-3 days or whatever
    // Every sequence can have its own behavior so maybe
    // the pattern Chain of Responsibility can help here.
    return { delivered: 1, status: 'ok' };
  }
}
