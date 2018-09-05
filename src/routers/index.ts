import { Context } from 'koa';
import * as koaCompose from 'koa-compose';
import * as Router from 'koa-router';
import * as _ from 'lodash';
import errorInterceptor from '../interceptors/error.interceptor';
import { memberRouter } from './member.router';

export const healthyCheckRouter = new Router();
healthyCheckRouter.get('/healthy-check',
  async (ctx: Router.IRouterContext) => {
    ctx.status = 200;
    ctx.body = {msg: 'healthy check successfully'};
  },
);
const routers: Router[] = [
  healthyCheckRouter,
  memberRouter,
];

let composedMiddleware: koaCompose.ComposedMiddleware<Context>;
composedMiddleware = koaCompose(_.map(routers, (router) => {
  return router.routes();
}));

composedMiddleware = koaCompose([errorInterceptor, composedMiddleware]);

export  default composedMiddleware;
