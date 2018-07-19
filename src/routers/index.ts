import * as Joi from 'joi';
import * as Router from 'koa-joi-router';
export { tradeInfoRouter } from './trade-info.route';

export const healthyCheckRouter: Router.Router = Router();
healthyCheckRouter.route({
  method: 'GET',
  path: '/healthy-check',
  handler: async (ctx: Router.Context) => {
    ctx.status = 200;
    ctx.body = {msg: 'healthy check successfully'};
  },
});
