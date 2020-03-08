import { createConnection } from 'typeorm';
import LoggerInstance from './logger';
import config from '../config';

export default async (): Promise<string> => {
  try {
    const connection = await createConnection({
      type: 'postgres',
      url: config.database.url,
      synchronize: true,
      dropSchema: true,
      entities: ['src/entities/*.ts'],
    });

    return connection.name;
  } catch (err) {
    LoggerInstance.error('🔥 Error on making database connection: %o', err);
    throw err;
  }
};
