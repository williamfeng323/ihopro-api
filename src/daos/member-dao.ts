import { Collection } from 'mongodb';
import mongoProvider from '../db/mongo-provider';
import { IMembership } from '../schemas/member';

export default {
  collection<T extends IMembership>(): Collection<T> {
    return mongoProvider.db().collection<T>('membership');
  },
};
