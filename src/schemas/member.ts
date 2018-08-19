// import * as Joi from 'joi';
import { Joi } from 'koa-joi-router';
import { ObjectId } from 'mongodb';

export enum MemberRole {
  regular = 'regular',
  proAgent = 'proAgent',
  individual = 'individual',
}

export interface IMembership {
  _id?: ObjectId;
  role?: MemberRole;
  memberLevel?: number;
  phoneNumber?: number;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  orders?: ObjectId[];
  idCardNumber?: number;
  professionalImage?: string; // a url for the professional image.
}

export const initMembershipValidator = Joi.object({
  phoneNumber: Joi.number().description('cell phone as login account'),
  email: Joi.string().email(),
  password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .error(new Error('Minimum eight characters, at least one uppercase letter, one lowercase letter and one number.')),
  firstName: Joi.string().required().description('名'),
  lastName: Joi.string().required().description('姓'),
  role: Joi.string().required().allow(Object.values(MemberRole))
    .description(`The role of member. It could be one of ${Object.values(MemberRole)}`),
  memberLevel: Joi.number().required().default(1, 'Membership level starts from 1'),
}).or('phoneNumber', 'email');
