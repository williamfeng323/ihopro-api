import 'dotenv/config';

import { logger } from '../config';
import { mongoConfig } from '../config';
import { MongoAccessor } from './mongo-accessor';
const { MongoClient } = require('mongodb');
import createMongoIndexes from './create-mongo-indexes';

process.on('unhandledRejection', e => { throw e; });

(async () => {
  const mongoAccessor = new MongoAccessor(mongoConfig);
  const connectionString = mongoAccessor.connectionString;

  logger.info(`connecting to db host: ${mongoConfig.mongoHost}`);
  const client = await MongoClient.connect(connectionString);

  try {
    const db = client.db(mongoConfig.mongoDbName);
    logger.info('Creating indexes');
    await createMongoIndexes(db);
    logger.info('Done!');
  } finally {
    logger.info('closing database connection');
    client.close();
  }
})();
