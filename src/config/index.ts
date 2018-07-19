import 'dotenv/config';
import * as winston from 'winston';
import { IConfigMongo } from '../db/mongo-provider';

export const mongoConfig: IConfigMongo = {
  mongoHost: process.env.MONGO_CONFIG_HOST,
  mongoUsername: process.env.MONGO_CONFIG_USERNAME,
  mongoPassword: process.env.MONGO_CONFIG_PASSWORD,
  mongoPort: Number(process.env.MONGO_CONFIG_PORT),
  mongoDbName: process.env.MONGO_CONFIG_DBNAME,
  mongoOptions: { poolSize: 50 },
  mongoUseDnsSeedlist: process.env.MONGO_USE_DNS_SEED_LIST === 'true',
};

const level = process.env.LOG_LEVEL || 'debug';

export const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      level,
      timestamp: true,
    }),
  ],
});

export const requestBodySize = process.env.REQUEST_BODY_SIZE || '10mb';
