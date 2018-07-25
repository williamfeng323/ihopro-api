import { ObjectId } from 'mongodb';

export enum MemberRole {
  regular = 'regular',
  proAgent = 'proAgent',
  individual = 'individual',
}

export interface IMembership {
  _id: ObjectId;
  role: MemberRole;
  memberLevel: number;
  orders?: ObjectId[];
  cellPhone: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  idCardNumber: number;
  professionalImage: string; // a url for the professional image.
}
