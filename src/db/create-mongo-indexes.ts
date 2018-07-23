import { Db } from 'mongodb';

/**
 * Creates all the Mongo indexes required for the app to run, if they do not exist yet.
 * @param db database to create indexes on
 */
export default async function createMongoIndexes(db: Db) {
  await db.collection('sortOrderIncrementCounter').createIndex(
    { memberId: 1 },
    { unique: true, background: true },
  );

  await db.collection('apiKey').createIndex(
    { owner: 1 },
    { unique: true, background: true },
  );

  await db.collection('shippingAddress').createIndex(
    { memberId: 1 },
    { unique: true, background: true },
  );

  // TODO: Setting all these indexes for now, just to get a performant thing out the door
  // but ideally would have to fine tune and remove unecessary
  await db.collection('registryItem').createIndexes(
    [
      { key: { updatedAt: 1 }, unique: false, background: true },
      { key: { deleted: 1 }, unique: false, background: true },
      { key: { sortOrder: 1 }, unique: false, background: true, sparse: true },
      {
        key: { registryId: 1, productId: 1, type: 1 },
        unique: false,
        background: true,
        sparse: true,
      },
      {
        key: { cashFundId: 1, type: 1 },
        unique: false,
        background: true,
        sparse: true,
      },
      {
        key: { memberId: 1, fulfilled: 1, priceCents: 1 },
        unique: false,
        background: true,
        sparse: true,
      },
      {
        key: { registryId: 1, fulfilled: 1, priceCents: 1 },
        unique: false,
        background: true,
        sparse: true,
      },
      {
        key: { memberId: 1, sortOrder: 1 },
        unique: false,
        background: true,
        sparse: true,
      },
    ],
  );
}
