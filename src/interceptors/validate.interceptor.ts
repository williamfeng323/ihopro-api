import * as Joi from 'joi';
import * as Router from 'koa-router';
import * as _ from 'lodash';

export interface IJoiValidatorSchema {
  header?: Joi.AnySchema;
  query?: Joi.AnySchema;
  params?: Joi.AnySchema;
  body?: Joi.AnySchema;
  failureCode?: number;
}

const middleware = (schemas: IJoiValidatorSchema, options?: Joi.ValidationOptions) => {
  options = options || {};
  return async function(ctx: Router.IRouterContext, next) {
    const props = 'header query params body'.split(' ');
    for (const prop of props ) {
      if (_.isNil(schemas[prop])) { continue; }
      try {
        await (schemas[prop] as Joi.AnySchema).validate(ctx.request[prop], options);
      } catch (err) {
        ctx.response.status = 400;
        ctx.response.body = {
          msg: `validation failed on {${err.message}}`,
        };
        return;
      }
    }
    await next();
  };
};

export default middleware;
