import { Request } from 'express';
import { IUser } from './IUser';

interface IJWTToken {
  id: number;
  exp: number;
}
export interface IGetUserAuthInfoRequest extends Request {
  currentUser: IUser; // or any other type
  token: IJWTToken;
}
