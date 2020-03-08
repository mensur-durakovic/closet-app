import { Container } from 'typedi';
import LoggerInstance from './logger';
import RoleRepository from '../repository/roleRepository';
import UserRepository from '../repository/userRepository';
import config from '../config';
import mailgun from 'mailgun-js';

export default () => {
  try {
    Container.set('logger', LoggerInstance);
    Container.set('emailClient', mailgun({ apiKey: config.emails.apiKey, domain: config.emails.domain }));

    Container.set('roleRepository', new RoleRepository());
    Container.set('userRepository', new UserRepository());

    LoggerInstance.info('✌️ Depndencies injected into container');
  } catch (e) {
    LoggerInstance.error('🔥 Error on dependency injector loader: %o', e);
    throw e;
  }
};
