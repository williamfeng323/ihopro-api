import { MongoClient } from 'mongodb';
import { mongoConfig } from '../config';
import { MongoAccessor } from './mongo-accessor';

export interface IConfigMongo {
  mongoHost: string;
  mongoUsername: string;
  mongoPassword: string;
  mongoPort: number;
  mongoDbName: string;
  mongoOptions: {
    poolSize: number;
  };
  mongoUseDnsSeedlist: boolean;
}

let mongoClient: MongoClient = null;

export default {
  async connect() {
    if (!mongoClient || !mongoClient.isConnected) {
      console.log('Creating new connection');
      mongoClient = await MongoClient.connect(
        new MongoAccessor(mongoConfig).connectionString,
        mongoConfig.mongoOptions,
      );
    }
  },
  async close() {
    if (mongoClient && mongoClient.isConnected) {
      const promise = mongoClient.close();
      mongoClient = null;
      return promise;
    }
  },
  client() {
    return mongoClient;
  },
  db() {
    if (!this.client() || !this.client().isConnected) {
      throw new Error('Disconnected from Mongo database');
    }

    return this.client().db(mongoConfig.mongoDbName);
  },
};
