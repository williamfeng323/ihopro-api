import * as _ from 'lodash';
import {
  CollectionInsertOneOptions, CommonOptions, Db, FilterQuery, FindOneOptions, MongoClient,
  MongoClientOptions, OrderedBulkOperation, ReplaceOneOptions,
} from 'mongodb';
import { IConfigMongo } from './mongo-provider';

const mongoClients: { [key: string]: MongoClient } = {};

export class MongoAccessor<T> {
  protected collectionName: string;
  private mongoConnection: string;
  private mongoDbName: string;
  private dbName: string;
  private mongoOptions: MongoClientOptions;
  private db: Db;

  constructor(mongoConfigOrDb: IConfigMongo | Db) {
    if (_.isNil((mongoConfigOrDb as Db).databaseName)) {
      const mongoConfig = mongoConfigOrDb as IConfigMongo;
      this.setConnectionString(mongoConfig);
      this.mongoDbName = mongoConfig.mongoHost + '/' + mongoConfig.mongoDbName;
      this.dbName = mongoConfig.mongoDbName;
      this.mongoOptions = mongoConfig.mongoOptions;
    } else {
      this.db = mongoConfigOrDb as Db;
    }
  }

  get connectionString(): string {
    return this.mongoConnection;
  }

  public async get(
    query: FilterQuery<T>, options?: FindOneOptions,
    orderField?: string | object | object[], direction?: number ) {
    await this.getDb();
    const table = this.db.collection<T>(this.collectionName);
    if (!_.isEmpty(orderField)) {
      return await table.find(query, options).sort(orderField, direction).toArray();
    } else {
      return await table.find(query, options).toArray();
    }
  }

  public async insertOne(fullDoc: T, bulkOps?: OrderedBulkOperation, options?: CollectionInsertOneOptions) {
    await this.getDb();
    const table = this.db.collection<T>(this.collectionName);
    // Found that insert function would change the fullDoc structure
    // so cloning the object in case, the fulDoc need to use after insertOne
    const cloneDoc = _.cloneDeep(fullDoc);
    if (bulkOps) {
      return bulkOps.insert(cloneDoc);
    }
    return await table.insertOne(cloneDoc);
  }

  public async updateOne(doc: T, query: FilterQuery<T>, bulkOps?: OrderedBulkOperation, options?: ReplaceOneOptions) {
    await this.getDb();
    const table = this.db.collection<T>(this.collectionName);
    const cloneDoc = _.cloneDeep(doc);
    if (bulkOps) {
      return bulkOps.find(query).updateOne(cloneDoc);
    }
    return await table.findOneAndReplace(query, { $set: cloneDoc }, options);
  }

  public async initBulkOps() {
    await this.getDb();
    const table = this.db.collection<T>(this.collectionName);
    return table.initializeOrderedBulkOp();
  }

  public async deleteOne(
    query: FilterQuery<T>,
    bulkOps?: OrderedBulkOperation,
    options?: CommonOptions & { bypassDocumentValidation?: boolean },
  ) {
    await this.getDb();
    const table = this.db.collection<T>(this.collectionName);
    if (bulkOps) {
      return bulkOps.find(query).deleteOne();
    }
    return await table.deleteOne(query, options);
  }

  public async getDb() {
    if (_.isNil(this.db)) {
      const mongoClient = await this.getClient();
      this.db = mongoClient.db(this.dbName);
    }

    return this.db;
  }

  public async getClient() {
    if (_.isNil(mongoClients[this.mongoDbName])) {
      mongoClients[this.mongoDbName] = await MongoClient.connect(this.mongoConnection, this.mongoOptions);
    }
    return mongoClients[this.mongoDbName];
  }

  public getCollection() {
    return this.db.collection<T>(this.collectionName);
  }

  private setConnectionString(mongoConfig: IConfigMongo) {
    if (mongoConfig.mongoUseDnsSeedlist) {
      this.mongoConnection = `mongodb+srv://${encodeURIComponent(mongoConfig.mongoUsername)}:` +
        `${encodeURIComponent(mongoConfig.mongoPassword)}@${mongoConfig.mongoHost}` +
        `/${mongoConfig.mongoDbName}`;
    } else {
      this.mongoConnection = `mongodb://${encodeURIComponent(mongoConfig.mongoUsername)}:` +
        `${encodeURIComponent(mongoConfig.mongoPassword)}@${mongoConfig.mongoHost}:` +
        `${mongoConfig.mongoPort}/${mongoConfig.mongoDbName}`;
    }
  }
}
