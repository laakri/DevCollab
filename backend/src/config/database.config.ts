import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { envConfig } from './env.config';

export const databaseConfig = registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: envConfig().database.host,
    port: envConfig().database.port,
    username: envConfig().database.username,
    password: envConfig().database.password,
    database: envConfig().database.name,
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: envConfig().nodeEnv === 'development',
    ssl: false,
  }),
);
