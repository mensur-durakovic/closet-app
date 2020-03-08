import { Container } from 'typedi';
import { Router, Request, Response, NextFunction } from 'express';
import middlewares from '../middlewares';
import { IGetUserAuthInfoRequest } from '../../interfaces/Utilities';
import { celebrate } from 'celebrate';
import { Logger } from 'winston';
import UserService from '../../services/userService';
import { IUserEditDTO } from '../../interfaces/IUser';
import { EditUserValidation } from '../validations/UserValidation';
const route = Router();

export default (app: Router) => {
  app.use('/users', route);

  route.get('/me', middlewares.isAuth, middlewares.attachCurrentUser, (req: IGetUserAuthInfoRequest, res: Response) => {
    return res.json({ user: req.currentUser }).status(200);
  });

  route.post('/edit', celebrate(EditUserValidation), async (req: Request, res: Response, next: NextFunction) => {
    const logger: Logger = Container.get('logger');
    logger.debug('Calling /users/edit endpoint with body: %o', req.body);
    try {
      const userServiceInstance = Container.get(UserService);
      const updatedUser = await userServiceInstance.edit(req.body.id, req.body as IUserEditDTO);
      return res.status(201).json(updatedUser);
    } catch (e) {
      logger.error('🔥 error on /users/edit: %o', e);
      return next(e);
    }
  });
};
