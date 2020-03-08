import { getConnection } from 'typeorm';
import LoggerInstance from './logger';
import RoleEntity from '../entities/Role';
import Roles from '../constants/roles';

export default async () => {
  try {
    const userRoleExists = await getConnection()
      .getRepository(RoleEntity)
      .createQueryBuilder('role')
      .where('role.name = :userRole', { userRole: Roles.USER })
      .orWhere('role.name = :adminRole', { adminRole: Roles.ADMIN })
      .getCount();

    if (userRoleExists === 0) {
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(RoleEntity)
        .values([{ name: Roles.USER }, { name: Roles.ADMIN }])
        .execute();
    }
  } catch (err) {
    LoggerInstance.error('🔥 Error on seeding database: %o', err);
    throw err;
  }
};
