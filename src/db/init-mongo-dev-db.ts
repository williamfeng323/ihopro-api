import 'dotenv/config';
import { logger, mongoConfig } from '../config';

const { MongoClient } = require('mongodb');

process.on('unhandledRejection', e => { throw e; });

const tryAddDBAccount = async(adminDb, userName, password, dbName) => {
  try {
    const addedAdmin = await adminDb.addUser(userName, password, {
      roles: [
        { role: 'dbOwner', db: dbName },
      ],
    });
  } catch (error) {
    logger.info('skipping create db owner.');
  }
};

(async () => {
  const till = new Date(new Date().getTime() + 3000);
  while (till > new Date()) { const i = 1; }

  // TODO: HACK: Undo when we have a common place to generate conn strings
  const connectionString = `mongodb://admin:` +
    `${encodeURIComponent(process.env.MONGO_CONFIG_PASSWORD)}@${process.env.MONGO_CONFIG_HOST}:` +
    `${process.env.MONGO_CONFIG_PORT}`;

  logger.info(`Connecting to database on host ${mongoConfig.mongoHost}`);
  const clientAdmin = await MongoClient.connect(connectionString);

  try {
    const adminDb = clientAdmin.db(mongoConfig.mongoDbName);

    logger.info(`Attempting to drop database ${mongoConfig.mongoDbName}`);
    await adminDb.dropDatabase();
    logger.info(`Done dropping database`);

    logger.info(`Attempting to create db account for user ${process.env.MONGO_CONFIG_DB_OWNER_USERNAME}`);
    await tryAddDBAccount(adminDb, process.env.MONGO_CONFIG_DB_OWNER_USERNAME,
      mongoConfig.mongoPassword, mongoConfig.mongoDbName);
    logger.info(`Done creating db account`);

    logger.info(`Attempting to create db account for user ${mongoConfig.mongoUsername}`);
    await tryAddDBAccount(adminDb, mongoConfig.mongoUsername,
      mongoConfig.mongoPassword, mongoConfig.mongoDbName);
    logger.info(`Done creating db account`);

    logger.info('Finished dev db initialization!');
  } finally {
    logger.info('Closing database connection');
    await clientAdmin.close();
  }
})();
