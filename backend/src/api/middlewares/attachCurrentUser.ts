import { Container } from 'typedi';
import express from 'express';
import { Logger } from 'winston';
import { IGetUserAuthInfoRequest } from '../../interfaces/Utilities';
import IUserRepository from '../../interfaces/IUserRepository';
import UserDTO from '../../dtos/UserDTO';

/**
 * Attach user to req.user
 * @param {*} req Express req Object
 * @param {*} res  Express res Object
 * @param {*} next  Express next Function
 */
const attachCurrentUser = async (req: IGetUserAuthInfoRequest, res: express.Response, next: express.NextFunction) => {
  const Logger: Logger = Container.get('logger');
  const userRepository: IUserRepository = Container.get('userRepository');
  try {
    const userRecord = await userRepository.findById(req.token.id);
    if (!userRecord) {
      return res.sendStatus(401);
    }

    const currentUser = UserDTO.fromEntity(userRecord);
    req.currentUser = currentUser;
    return next();
  } catch (e) {
    Logger.error('🔥 Error attaching user to req: %o', e);
    return next(e);
  }
};

export default attachCurrentUser;
