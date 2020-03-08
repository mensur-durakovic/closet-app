import Gender from '../constants/gender';
import { IRole } from './IRole';

export interface IUser {
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
}

export interface IUserSignUpDTO {
  email: string;
  password: string;
  salt?: string;
}

export interface IUserEditDTO {
  dateOfBirth?: Date;
  gender: Gender;
  favouriteQuote?: string;
  firstName: string;
  lastName: string;
  password?: string;
}

export interface IUserOutputDTO {
  id: number;
  dateOfBirth?: Date;
  gender: Gender;
  favouriteQuote?: string;
  firstName: string;
  lastName: string;
}
