import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import databaseLoader from './database';
import databaseSeederLoader from './databaseSeeder';
import Logger from './logger';

export default async ({ expressApp }) => {
  await databaseLoader();
  Logger.info('✌️ DB loaded and connected!');

  await dependencyInjectorLoader();

  await databaseSeederLoader();
  Logger.info('✌️ DB seeded!');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
